# feat(overlay): Separate overlay recording from main app functionality

- Create dedicated overlay recording handlers in useOverlay hook
- Add overlay-specific text insertion logic in TranscriptionService
- Update OverlayService to handle overlay mode recording states
- Improve error handling and fallback mechanisms
- Maintain recording state without triggering main app UI updates

This change separates the overlay recording functionality from the main app
while maintaining the existing architecture and services. The overlay now
operates independently, preventing unwanted navigation and UI updates in
the main app during overlay recording sessions.

Technical changes:

- Added startOverlayRecording and stopOverlayRecording in useOverlay.ts
- Enhanced sendToApp method with overlay mode support
- Updated OverlayService.kt broadcast handling
- Improved error handling with clipboard fallback
