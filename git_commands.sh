# Stage all modified files
git add hooks/useOverlay.ts
git add context/transcription/services/transcriptionService.ts
git add android/app/src/main/java/com/transboard/app/OverlayService.kt

# Create commit with message
git commit -m "feat(overlay): Separate overlay recording from main app functionality

- Create dedicated overlay recording handlers in useOverlay hook
- Add overlay-specific text insertion logic in TranscriptionService
- Update OverlayService to handle overlay mode recording states
- Improve error handling and fallback mechanisms
- Maintain recording state without triggering main app UI updates"

# Push to remote repository (assuming you're on the main branch)
git push origin main