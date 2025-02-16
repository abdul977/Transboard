fix(overlay): improve recording state handling and error propagation

- Fix recording state synchronization between OverlayService and Module
- Add proper error handling and propagation across native bridge
- Improve broadcast communication between components
- Add state reset on recording errors
- Add safety checks for recording state transitions
- Add hideOverlay method to properly clean up recording state

This change ensures that the overlay recording state is properly
maintained between the native and JS layers, and that errors are
properly handled and propagated. Users should now see proper
behavior when starting/stopping recording and better error feedback.
