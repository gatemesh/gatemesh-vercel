#include "SerialConsole.h"
#include "Default.h"
#include "NodeDB.h"
#include "PowerFSM.h"
#include "Throttle.h"
#include "configuration.h"
#include "modules/irrigation/IrrigationModule.h"
#include "time.h"

extern IrrigationModule *irrigationModule;

#if defined(ARDUINO_USB_CDC_ON_BOOT) && ARDUINO_USB_CDC_ON_BOOT
#define IS_USB_SERIAL
#ifdef SERIAL_HAS_ON_RECEIVE
#undef SERIAL_HAS_ON_RECEIVE
#endif
#include "HWCDC.h"
#endif

#ifdef RP2040_SLOW_CLOCK
#define Port Serial2
#else
#ifdef USER_DEBUG_PORT // change by WayenWeng
#define Port USER_DEBUG_PORT
#else
#define Port Serial
#endif
#endif
// Defaulting to the formerly removed phone_timeout_secs value of 15 minutes
#define SERIAL_CONNECTION_TIMEOUT (15 * 60) * 1000UL

SerialConsole *console;

void consoleInit()
{
    auto sc = new SerialConsole(); // Must be dynamically allocated because we are now inheriting from thread

#if defined(SERIAL_HAS_ON_RECEIVE)
    // onReceive does only exist for HardwareSerial not for USB CDC serial
    Port.onReceive([sc]() { sc->rxInt(); });
#endif
    DEBUG_PORT.rpInit(); // Simply sets up semaphore
}

void consolePrintf(const char *format, ...)
{
    va_list arg;
    va_start(arg, format);
    console->vprintf(nullptr, format, arg);
    va_end(arg);
    console->flush();
}

SerialConsole::SerialConsole() : StreamAPI(&Port), RedirectablePrint(&Port), concurrency::OSThread("SerialConsole")
{
    assert(!console);
    console = this;
    canWrite = false; // We don't send packets to our port until it has talked to us first

#ifdef RP2040_SLOW_CLOCK
    Port.setTX(SERIAL2_TX);
    Port.setRX(SERIAL2_RX);
#endif
    Port.begin(SERIAL_BAUD);
#if defined(ARCH_NRF52) || defined(CONFIG_IDF_TARGET_ESP32S2) || defined(CONFIG_IDF_TARGET_ESP32S3) || defined(ARCH_RP2040) ||   \
    defined(CONFIG_IDF_TARGET_ESP32C3) || defined(CONFIG_IDF_TARGET_ESP32C6)
    time_t timeout = millis();
    while (!Port) {
        if (Throttle::isWithinTimespanMs(timeout, FIVE_SECONDS_MS)) {
            delay(100);
        } else {
            break;
        }
    }
#endif
#if !ARCH_PORTDUINO
    emitRebooted();
#endif
}

int32_t SerialConsole::runOnce()
{
#ifdef HELTEC_MESH_SOLAR
    // After enabling the mesh solar serial port module configuration, command processing is handled by the serial port module.
    if (moduleConfig.serial.enabled && moduleConfig.serial.override_console_serial_port &&
        moduleConfig.serial.mode == meshtastic_ModuleConfig_SerialConfig_Serial_Mode_MS_CONFIG) {
        return 250;
    }
#endif

    // Read and process text commands
    readLine();

    int32_t delay = runOncePart();
#if defined(SERIAL_HAS_ON_RECEIVE)
    return Port.available() ? delay : INT32_MAX;
#elif defined(IS_USB_SERIAL)
    return HWCDC::isPlugged() ? delay : (1000 * 20);
#else
    return delay;
#endif
}

void SerialConsole::flush()
{
    Port.flush();
}

// trigger tx of serial data
void SerialConsole::onNowHasData(uint32_t fromRadioNum)
{
    setIntervalFromNow(0);
}

// trigger rx of serial data
void SerialConsole::rxInt()
{
    setIntervalFromNow(0);
}

// For the serial port we can't really detect if any client is on the other side, so instead just look for recent messages
bool SerialConsole::checkIsConnected()
{
    return Throttle::isWithinTimespanMs(lastContactMsec, SERIAL_CONNECTION_TIMEOUT);
}

/**
 * we override this to notice when we've received a protobuf over the serial
 * stream.  Then we shut off debug serial output.
 */
bool SerialConsole::handleToRadio(const uint8_t *buf, size_t len)
{
    // only talk to the API once the configuration has been loaded and we're sure the serial port is not disabled.
    if (config.has_lora && config.security.serial_enabled) {
        // Switch to protobufs for log messages
        usingProtobufs = true;
        canWrite = true;

        return StreamAPI::handleToRadio(buf, len);
    } else {
        return false;
    }
}

void SerialConsole::log_to_serial(const char *logLevel, const char *format, va_list arg)
{
    if (usingProtobufs && config.security.debug_log_api_enabled) {
        meshtastic_LogRecord_Level ll = RedirectablePrint::getLogLevel(logLevel);
        auto thread = concurrency::OSThread::currentThread;
        emitLogRecord(ll, thread ? thread->ThreadName.c_str() : "", format, arg);
    } else
        RedirectablePrint::log_to_serial(logLevel, format, arg);
}

void SerialConsole::readLine()
{
    while (Port.available() && lineBufferPos < sizeof(lineBuffer) - 1) {
        char c = Port.read();

        if (c == '\n' || c == '\r') {
            if (lineBufferPos > 0) {
                lineBuffer[lineBufferPos] = '\0';
                processTextCommand(lineBuffer);
                lineBufferPos = 0;
            }
        } else {
            lineBuffer[lineBufferPos++] = c;
        }
    }
}

void SerialConsole::processTextCommand(const char *cmd)
{
    // Skip empty commands
    if (!cmd || strlen(cmd) == 0)
        return;

    // Skip commands that start with protobuf framing
    if (cmd[0] == 0x94)
        return;

    // Trim leading/trailing whitespace
    const char *start = cmd;
    while (*start && isspace(*start))
        start++;

    const char *end = start + strlen(start) - 1;
    while (end > start && isspace(*end))
        end--;

    char trimmedCmd[256];
    size_t len = end - start + 1;
    if (len >= sizeof(trimmedCmd))
        len = sizeof(trimmedCmd) - 1;
    memcpy(trimmedCmd, start, len);
    trimmedCmd[len] = '\0';

    // Process commands
    if (irrigationModule) {
        irrigationModule->handleConsoleCommand(trimmedCmd);
    } else {
        consolePrintf("Command not recognized: %s\n", trimmedCmd);
    }
}