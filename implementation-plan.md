# Implementation Plan: Overlay Recording with Expo Development Build

## 0. Development Build Setup
1. Configure development build
```bash
npx expo prebuild
```

2. Install additional required dependencies
- Install `react-native-view-overflow` for Android overlay support
- Add any other native dependencies needed for overlay functionality
- Update gradle configurations

## 1. Android Permission Setup
- Add SYSTEM_ALERT_WINDOW permission to AndroidManifest.xml
- Create native module for permission management
- Implement permission request flow

## 2. Overlay Service Implementation
Create a new service to manage the overlay window:
```typescript
// services/OverlayService.ts
- Initialize overlay window
- Handle overlay positioning
- Manage overlay visibility
- Bridge with audio recording service
```

## 3. UI Components
Modify existing FloatingButton for overlay mode:
- Add overlay mode styles
- Implement drag-to-move functionality
- Add minimize/maximize states
- Show recording duration in overlay

## 4. Background Service
Implement background service for persistent recording:
- Foreground service notification
- Audio recording state management
- Handle app switching gracefully

## 5. Integration Points
1. Modify AudioService:
   - Add overlay mode support
   - Handle background recording
   - Manage state persistence

2. Update TranscriptionProvider:
   - Add overlay state management
   - Handle permission flow
   - Coordinate between overlay and main app

## 6. Testing Plan
- Test permission handling
- Verify overlay behavior across apps
- Ensure recording works in background
- Test state restoration after app switch

## 7. Implementation Phases

### Phase 1: Development Build & Native Setup
1. Create development build using prebuild
2. Configure native modules
3. Test build on device
4. Setup debugging tools
5. Create baseline for native code integration

### Phase 2: Permission & Native Modules
1. Add required Android permissions
2. Create OverlayPermission native module
3. Implement permission request flow

### Phase 3: Overlay Service
1. Create basic overlay window
2. Implement positioning system
3. Add touch handling

### Phase 4: UI Updates
1. Modify FloatingButton for overlay
2. Add recording status display
3. Implement minimize/maximize

### Phase 5: Background Service
1. Setup foreground service
2. Handle background recording
3. Add notification system

### Phase 6: Integration & Testing
1. Connect all components
2. Comprehensive testing
3. Bug fixes and optimizations

## Technical Considerations
- Use Android WindowManager for overlay
- Implement efficient state management
- Handle orientation changes
- Consider memory management
- Ensure battery optimization

## Next Steps
1. Start development build setup
2. Configure native module environment
3. Begin permission implementation
4. Implement core overlay functionality
5. Integrate with existing recording system