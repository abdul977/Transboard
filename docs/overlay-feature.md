# Overlay Recording Feature

The Transboard app now supports an overlay recording button that can float over other apps on Android devices. This feature allows users to quickly record and transcribe audio without switching back to the main app.

## How to Use

1. **Normal Mode**
   - The recording button appears in the bottom right corner of the app
   - Tap once to start/stop recording
   - Long press (800ms) to switch to overlay mode

2. **Overlay Mode**
   - The button will float over other apps
   - Can be dragged to any position on the screen
   - Tap to start/stop recording
   - Shows recording duration
   - Long press to return to normal mode

## Requirements

- Android device running Android 6.0 (API level 23) or higher
- Overlay permission granted to the app
- Audio recording permission granted

## Permissions

When using overlay mode for the first time, the app will request the following permissions:
- `SYSTEM_ALERT_WINDOW` - Required for displaying overlay
- `RECORD_AUDIO` - Required for audio recording
- `FOREGROUND_SERVICE` - Required for background operation

## Technical Implementation

The overlay feature is implemented using:
- Native Android WindowManager for overlay display
- Foreground service for persistent operation
- React Native bridge for communication
- Custom native modules for permission handling

## Troubleshooting

1. **Overlay Not Showing**
   - Check if overlay permission is granted in system settings
   - Ensure no other app is blocking overlays
   - Try restarting the app

2. **Recording Issues**
   - Verify microphone permissions
   - Check if another app is using the microphone
   - Ensure background services are not restricted

3. **Performance Issues**
   - Clear app cache
   - Check for battery optimization settings
   - Ensure adequate system resources are available

## Known Limitations

- Overlay mode is only available on Android devices
- Some devices may restrict overlay permissions
- Battery usage may increase in overlay mode
- May not work with some system-level apps

## Future Improvements

- Add overlay size adjustment
- Implement transparency control
- Add quick settings toggle
- Support for custom overlay positions
- Enhanced visual feedback for recording status