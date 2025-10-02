#include "AdaptivePowerModule.h"
#include "MeshService.h"
#include "NodeDB.h"
#include "modules/NeighborInfoModule.h"
#include "modules/IrrigationScheduleModule.h"
#include "configuration.h"
#include "sleep.h"
#include <string.h>

AdaptivePowerModule* adaptivePowerModule;

AdaptivePowerModule::AdaptivePowerModule() : 
    concurrency::OSThread("AdaptivePower"),
    history_index(0),
    last_adjustment_time(0),
    current_adaptive_power(0)
{
    // Initialize with conservative defaults
    loadDefaultSettings(ADAPTIVE_POWER_OFF);
    
    // Clear history
    memset(history, 0, sizeof(history));
    
    // Set thread to run every 4 hours by default (matching node wake schedule)
    setIntervalFromNow(4 * 60 * 60 * 1000); // 4 hours in milliseconds
}

void AdaptivePowerModule::loadDefaultSettings(AdaptivePowerMode mode)
{
    settings.mode = mode;
    settings.enabled_during_irrigation = false; // User specified no adjustments during irrigation
    
    switch (mode) {
        case ADAPTIVE_POWER_OFF:
            settings.min_power = config.lora.tx_power;
            settings.max_power = config.lora.tx_power;
            settings.target_rssi_min = -80.0f;
            settings.target_rssi_max = -60.0f;
            settings.adjustment_interval = 4 * 60 * 60; // 4 hours
            settings.power_step = 1;
            break;
            
        case ADAPTIVE_POWER_LOW:
            // Conservative power saving
            settings.min_power = max((int8_t)(config.lora.tx_power - 6), (int8_t)5);
            settings.max_power = config.lora.tx_power;
            settings.target_rssi_min = -85.0f;
            settings.target_rssi_max = -65.0f;
            settings.adjustment_interval = 4 * 60 * 60; // 4 hours
            settings.power_step = 2;
            break;
            
        case ADAPTIVE_POWER_MEDIUM:
            // Balanced optimization
            settings.min_power = max((int8_t)(config.lora.tx_power - 9), (int8_t)3);
            settings.max_power = config.lora.tx_power;
            settings.target_rssi_min = -88.0f;
            settings.target_rssi_max = -68.0f;
            settings.adjustment_interval = 4 * 60 * 60; // 4 hours
            settings.power_step = 3;
            break;
            
        case ADAPTIVE_POWER_HIGH:
            // Aggressive power saving (user requested starting point)
            settings.min_power = max((int8_t)(config.lora.tx_power - 12), (int8_t)2);
            settings.max_power = config.lora.tx_power;
            settings.target_rssi_min = -92.0f;
            settings.target_rssi_max = -70.0f;
            settings.adjustment_interval = 4 * 60 * 60; // 4 hours
            settings.power_step = 4;
            break;
            
        case ADAPTIVE_POWER_MAX:
            // Maximum power saving
            settings.min_power = max((int8_t)(config.lora.tx_power - 15), (int8_t)1);
            settings.max_power = config.lora.tx_power;
            settings.target_rssi_min = -95.0f;
            settings.target_rssi_max = -75.0f;
            settings.adjustment_interval = 4 * 60 * 60; // 4 hours
            settings.power_step = 5;
            break;
    }
    
    // Initialize current adaptive power to max power
    current_adaptive_power = settings.max_power;
}

bool AdaptivePowerModule::isGateMeshFamilyNode(const char* node_name)
{
    if (!node_name) return false;
    
    // Check for GateMesh naming conventions based on your firmware
    // These patterns match typical agriculture node naming
    const char* gatemesh_patterns[] = {
        "GateMesh",
        "GMesh",
        "Farm",
        "Irrigation",
        "Sensor",
        "Gateway",
        "Soil",
        "Moisture",
        "Weather",
        "Valve",
        "Pump",
        NULL
    };
    
    for (int i = 0; gatemesh_patterns[i] != NULL; i++) {
        if (strstr(node_name, gatemesh_patterns[i]) != NULL) {
            return true;
        }
    }
    
    return false;
}

float AdaptivePowerModule::calculateAverageNeighborRSSI()
{
    if (!neighborInfoModule) return -999.0f;
    
    float total_rssi = 0.0f;
    uint8_t count = 0;
    
    // Iterate through all nodes in the database
    for (int i = 0; i < nodeDB->getNumMeshNodes(); i++) {
        meshtastic_NodeInfoLite* node = nodeDB->getMeshNode(i);
        if (!node || node->num == nodeDB->getNodeNum()) continue; // Skip ourselves
        
        // Check if this is a GateMesh family node
        const char* node_name = node->user.long_name;
        if (!isGateMeshFamilyNode(node_name)) continue;
        
        // Get the last RSSI for this node
        // Note: This would need to be enhanced to track per-node RSSI history
        // For now, we'll use a simplified approach
        if (node->snr != 0) { // SNR is available, estimate RSSI
            // Rough conversion: RSSI ≈ SNR - 157 (for typical LoRa)
            float estimated_rssi = node->snr - 157.0f;
            total_rssi += estimated_rssi;
            count++;
        }
    }
    
    return (count > 0) ? (total_rssi / count) : -999.0f;
}

uint8_t AdaptivePowerModule::countGateMeshNeighbors()
{
    if (!neighborInfoModule) return 0;
    
    uint8_t count = 0;
    
    for (int i = 0; i < nodeDB->getNumMeshNodes(); i++) {
        meshtastic_NodeInfoLite* node = nodeDB->getMeshNode(i);
        if (!node || node->num == nodeDB->getNodeNum()) continue;
        
        const char* node_name = node->user.long_name;
        if (isGateMeshFamilyNode(node_name)) {
            count++;
        }
    }
    
    return count;
}

int8_t AdaptivePowerModule::calculateOptimalPower(float avg_rssi, uint8_t neighbor_count)
{
    if (avg_rssi == -999.0f || neighbor_count == 0) {
        // No valid neighbor data, maintain current power
        return current_adaptive_power;
    }
    
    int8_t new_power = current_adaptive_power;
    
    // Aggressive power saving logic as requested
    if (avg_rssi > settings.target_rssi_max) {
        // Signal too strong, reduce power aggressively
        new_power = max(current_adaptive_power - settings.power_step, settings.min_power);
    } else if (avg_rssi < settings.target_rssi_min) {
        // Signal too weak, increase power for stability
        new_power = min(current_adaptive_power + settings.power_step, settings.max_power);
    }
    
    // Additional neighbor count consideration
    if (neighbor_count >= 3) {
        // Good mesh density, can afford to be more aggressive with power saving
        new_power = max(new_power - 1, settings.min_power);
    } else if (neighbor_count == 1) {
        // Only one neighbor, be more conservative
        new_power = min(new_power + 1, settings.max_power);
    }
    
    return new_power;
}

bool AdaptivePowerModule::shouldAdjustPower()
{
    // Check if adaptive power is enabled
    if (settings.mode == ADAPTIVE_POWER_OFF) {
        return false;
    }
    
    // Check time interval (4 hours as specified)
    uint32_t current_time = millis();
    if (current_time - last_adjustment_time < (settings.adjustment_interval * 1000)) {
        return false;
    }
    
    // Check if irrigation is active and we're configured to skip during irrigation
    if (!settings.enabled_during_irrigation && isIrrigationActive()) {
        return false;
    }
    
    return true;
}

bool AdaptivePowerModule::isIrrigationActive()
{
    // Check if irrigation is currently running
    // This integrates with your existing IrrigationScheduleModule
    #ifdef IRRIGATION_MODULE_ENABLED
    if (irrigationModule && irrigationModule->isIrrigationActive()) {
        return true;
    }
    #endif
    
    return false;
}

bool AdaptivePowerModule::isPowerAdjustmentSafe(int8_t new_power)
{
    // Safety checks before applying power change
    
    // Check bounds
    if (new_power < settings.min_power || new_power > settings.max_power) {
        return false;
    }
    
    // Check regional limits
    if (myRegion && myRegion->powerLimit > 0 && new_power > myRegion->powerLimit) {
        return false;
    }
    
    // Don't make huge jumps at once
    if (abs(new_power - current_adaptive_power) > (settings.power_step * 2)) {
        return false;
    }
    
    return true;
}

void AdaptivePowerModule::recordPowerAdjustment(int8_t old_power, int8_t new_power, float avg_rssi, uint8_t neighbor_count, const char* reason)
{
    PowerAdjustmentHistory& entry = history[history_index];
    entry.timestamp = millis();
    entry.old_power = old_power;
    entry.new_power = new_power;
    entry.avg_neighbor_rssi = avg_rssi;
    entry.neighbor_count = neighbor_count;
    entry.reason = reason;
    
    history_index = (history_index + 1) % 10;
}

bool AdaptivePowerModule::applyPowerSetting(int8_t new_power)
{
    // Apply the new power setting to the LoRa configuration
    int8_t old_power = config.lora.tx_power;
    config.lora.tx_power = new_power;
    current_adaptive_power = new_power;
    
    // Trigger radio reconfiguration
    if (service && service->radio) {
        service->reloadConfig();
    }
    
    LOG_INFO("Adaptive Power: %d dBm -> %d dBm", old_power, new_power);
    return true;
}

void AdaptivePowerModule::logPowerAdjustment(int8_t old_power, int8_t new_power, const char* reason)
{
    LOG_INFO("Adaptive Power Adjustment: %d dBm -> %d dBm (%s)", old_power, new_power, reason);
}

int32_t AdaptivePowerModule::runOnce()
{
    if (!shouldAdjustPower()) {
        return settings.adjustment_interval * 1000; // Return next check interval
    }
    
    float avg_rssi = calculateAverageNeighborRSSI();
    uint8_t neighbor_count = countGateMeshNeighbors();
    
    if (avg_rssi == -999.0f) {
        LOG_DEBUG("Adaptive Power: No neighbor data available");
        return settings.adjustment_interval * 1000;
    }
    
    int8_t optimal_power = calculateOptimalPower(avg_rssi, neighbor_count);
    
    if (optimal_power != current_adaptive_power && isPowerAdjustmentSafe(optimal_power)) {
        int8_t old_power = current_adaptive_power;
        
        // Apply the new power setting
        if (applyPowerSetting(optimal_power)) {
            char reason[64];
            snprintf(reason, sizeof(reason), "RSSI %.1f, %d neighbors", avg_rssi, neighbor_count);
            
            recordPowerAdjustment(old_power, optimal_power, avg_rssi, neighbor_count, reason);
            logPowerAdjustment(old_power, optimal_power, reason);
            
            last_adjustment_time = millis();
        }
    }
    
    return settings.adjustment_interval * 1000; // Next adjustment in 4 hours
}

// Public API methods
void AdaptivePowerModule::setAdaptivePowerMode(AdaptivePowerMode mode)
{
    if (mode != settings.mode) {
        loadDefaultSettings(mode);
        
        if (mode == ADAPTIVE_POWER_OFF) {
            // Reset to original power setting
            resetToBasePower();
        } else {
            // Force immediate recalculation
            forceRecalculatePower();
        }
    }
}

void AdaptivePowerModule::setMinMaxPower(int8_t min_power, int8_t max_power)
{
    settings.min_power = min_power;
    settings.max_power = max_power;
}

void AdaptivePowerModule::setTargetRSSIRange(float min_rssi, float max_rssi)
{
    settings.target_rssi_min = min_rssi;
    settings.target_rssi_max = max_rssi;
}

void AdaptivePowerModule::setAdjustmentInterval(uint32_t interval_seconds)
{
    settings.adjustment_interval = interval_seconds;
    setInterval(interval_seconds * 1000);
}

void AdaptivePowerModule::setPowerStep(int8_t step_db)
{
    settings.power_step = step_db;
}

void AdaptivePowerModule::setIrrigationAdjustmentEnabled(bool enabled)
{
    settings.enabled_during_irrigation = enabled;
}

void AdaptivePowerModule::forceRecalculatePower()
{
    last_adjustment_time = 0; // Force immediate adjustment
    setIntervalFromNow(100); // Run in 100ms
}

void AdaptivePowerModule::resetToBasePower()
{
    // Reset to the base tx_power setting
    current_adaptive_power = settings.max_power;
    applyPowerSetting(current_adaptive_power);
    recordPowerAdjustment(config.lora.tx_power, current_adaptive_power, 0, 0, "Reset to base");
}

uint8_t AdaptivePowerModule::getHistoryCount() const
{
    uint8_t count = 0;
    for (int i = 0; i < 10; i++) {
        if (history[i].timestamp != 0) count++;
    }
    return count;
}

const char* AdaptivePowerModule::getModeString() const
{
    switch (settings.mode) {
        case ADAPTIVE_POWER_OFF: return "Off";
        case ADAPTIVE_POWER_LOW: return "Low";
        case ADAPTIVE_POWER_MEDIUM: return "Medium";
        case ADAPTIVE_POWER_HIGH: return "High";
        case ADAPTIVE_POWER_MAX: return "Maximum";
        default: return "Unknown";
    }
}

void AdaptivePowerModule::getStatusJSON(char* buffer, size_t buffer_size)
{
    float avg_rssi = calculateAverageNeighborRSSI();
    uint8_t neighbor_count = countGateMeshNeighbors();
    
    snprintf(buffer, buffer_size, 
        "{"
        "\"mode\":\"%s\","
        "\"enabled\":%s,"
        "\"current_power\":%d,"
        "\"base_power\":%d,"
        "\"min_power\":%d,"
        "\"max_power\":%d,"
        "\"avg_neighbor_rssi\":%.1f,"
        "\"neighbor_count\":%d,"
        "\"last_adjustment\":%lu,"
        "\"next_adjustment\":%lu"
        "}",
        getModeString(),
        isAdaptivePowerEnabled() ? "true" : "false",
        current_adaptive_power,
        settings.max_power,
        settings.min_power,
        settings.max_power,
        avg_rssi,
        neighbor_count,
        last_adjustment_time,
        last_adjustment_time + (settings.adjustment_interval * 1000)
    );
}