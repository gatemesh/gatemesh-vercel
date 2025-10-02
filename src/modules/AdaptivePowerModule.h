#pragma once
#include "ProtobufModule.h"
#include "concurrency/OSThread.h"
#include "mesh/generated/meshtastic/config.pb.h"

/*
 * Adaptive Power Control Module for GateMesh Agriculture
 * Automatically adjusts transmission power based on neighbor RSSI to optimize battery life
 * while maintaining stable packet transmission within the GateMesh family of nodes.
 */

enum AdaptivePowerMode {
    ADAPTIVE_POWER_OFF = 0,      // Disabled - use manual tx_power setting
    ADAPTIVE_POWER_LOW = 1,      // Conservative power saving
    ADAPTIVE_POWER_MEDIUM = 2,   // Balanced power optimization
    ADAPTIVE_POWER_HIGH = 3,     // Aggressive power saving
    ADAPTIVE_POWER_MAX = 4       // Maximum power saving
};

struct AdaptivePowerSettings {
    AdaptivePowerMode mode;
    int8_t min_power;           // Minimum power (dBm) - never go below this
    int8_t max_power;           // Maximum power (dBm) - never exceed this
    float target_rssi_min;      // Target RSSI range minimum (dBm)
    float target_rssi_max;      // Target RSSI range maximum (dBm)
    uint32_t adjustment_interval; // How often to adjust (seconds)
    int8_t power_step;          // Power adjustment step size (dB)
    bool enabled_during_irrigation; // Allow adjustments during irrigation events
};

struct PowerAdjustmentHistory {
    uint32_t timestamp;
    int8_t old_power;
    int8_t new_power;
    float avg_neighbor_rssi;
    uint8_t neighbor_count;
    const char* reason;
};

class AdaptivePowerModule : private concurrency::OSThread
{
  private:
    AdaptivePowerSettings settings;
    PowerAdjustmentHistory history[10]; // Keep last 10 adjustments
    uint8_t history_index;
    uint32_t last_adjustment_time;
    int8_t current_adaptive_power;
    
    // GateMesh family detection
    bool isGateMeshFamilyNode(const char* node_name);
    
    // Power calculation methods
    float calculateAverageNeighborRSSI();
    uint8_t countGateMeshNeighbors();
    int8_t calculateOptimalPower(float avg_rssi, uint8_t neighbor_count);
    
    // Safety checks
    bool shouldAdjustPower();
    bool isIrrigationActive();
    bool isPowerAdjustmentSafe(int8_t new_power);
    
    // History management
    void recordPowerAdjustment(int8_t old_power, int8_t new_power, float avg_rssi, uint8_t neighbor_count, const char* reason);
    
  public:
    AdaptivePowerModule();
    
    // Configuration
    void setAdaptivePowerMode(AdaptivePowerMode mode);
    AdaptivePowerMode getAdaptivePowerMode() const { return settings.mode; }
    
    void setMinMaxPower(int8_t min_power, int8_t max_power);
    void setTargetRSSIRange(float min_rssi, float max_rssi);
    void setAdjustmentInterval(uint32_t interval_seconds);
    void setPowerStep(int8_t step_db);
    void setIrrigationAdjustmentEnabled(bool enabled);
    
    // Status and monitoring
    bool isAdaptivePowerEnabled() const { return settings.mode != ADAPTIVE_POWER_OFF; }
    int8_t getCurrentAdaptivePower() const { return current_adaptive_power; }
    const PowerAdjustmentHistory* getPowerHistory() const { return history; }
    uint8_t getHistoryCount() const;
    
    // Manual control
    void forceRecalculatePower();
    void resetToBasePower();
    
    // Web API support
    const char* getModeString() const;
    void getStatusJSON(char* buffer, size_t buffer_size);
    
  protected:
    // OSThread implementation
    int32_t runOnce() override;
    
  private:
    // Default settings for different modes
    void loadDefaultSettings(AdaptivePowerMode mode);
    
    // Apply new power setting to radio
    bool applyPowerSetting(int8_t new_power);
    
    // Logging and debugging
    void logPowerAdjustment(int8_t old_power, int8_t new_power, const char* reason);
};

extern AdaptivePowerModule* adaptivePowerModule;