import { useEffect, useState, useCallback } from 'react';
import { NativeEventEmitter, NativeModules, Platform, EmitterSubscription, NativeModule } from 'react-native';
import { useTranscription } from '@/context/transcription';

class OverlayError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'OverlayError';
  }
}

// Base interface for module methods
interface OverlayModuleMethods {
  checkPermission(): Promise<boolean>;
  requestPermission(): Promise<boolean>;
  showOverlay(): Promise<boolean>;
  hideOverlay(): Promise<boolean>;
  onRecordingError?: (error: string) => void;
  transcribeAndInsertText(audioUri: string, promise: Promise<void>): void;
}

// Interface that extends NativeModule for EventEmitter compatibility
interface OverlayModuleType extends OverlayModuleMethods, NativeModule {}

// Event types for type safety
interface OverlayEvents {
  onStartRecording: void;
  onStopRecording: void;
  onRecordingError: string;
}

const OverlayModule = NativeModules.OverlayModule as OverlayModuleType;
const eventEmitter = new NativeEventEmitter(OverlayModule);

type SubscriptionsType = {
  start: EmitterSubscription;
  stop: EmitterSubscription;
  error: EmitterSubscription;
};

export const useOverlay = () => {
  const { state, dispatch, audioService, transcriptionService } = useTranscription();
  const [isOverlayActive, setIsOverlayActive] = useState(false);

  const checkOverlayPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return false;
    try {
      return await OverlayModule.checkPermission();
    } catch (error) {
      console.error('Error checking overlay permission:', error);
      throw new OverlayError(
        'Failed to check overlay permission',
        'PERMISSION_CHECK_FAILED'
      );
    }
  };

  const requestOverlayPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return false;
    try {
      return await OverlayModule.requestPermission();
    } catch (error) {
      console.error('Error requesting overlay permission:', error);
      throw new OverlayError(
        'Failed to request overlay permission',
        'PERMISSION_REQUEST_FAILED'
      );
    }
  };

  const showOverlay = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return false;
    try {
      const hasPermission = await checkOverlayPermission();
      if (!hasPermission) {
        const granted = await requestOverlayPermission();
        if (!granted) {
          throw new OverlayError(
            'Overlay permission not granted',
            'PERMISSION_DENIED'
          );
        }
      }
      const shown = await OverlayModule.showOverlay();
      if (shown) {
        setIsOverlayActive(true);
      }
      return shown;
    } catch (error) {
      console.error('Error showing overlay:', error);
      if (error instanceof OverlayError) {
        throw error;
      }
      throw new OverlayError(
        'Failed to show overlay',
        'SHOW_OVERLAY_FAILED'
      );
    }
  };

  const hideOverlay = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return false;
    try {
      const hidden = await OverlayModule.hideOverlay();
      if (hidden) {
        setIsOverlayActive(false);
      }
      return hidden;
    } catch (error) {
      console.error('Error hiding overlay:', error);
      throw new OverlayError(
        'Failed to hide overlay',
        'HIDE_OVERLAY_FAILED'
      );
    }
  };

  const startOverlayRecording = useCallback(async () => {
    if (!isOverlayActive) {
      throw new OverlayError('Overlay must be active to start recording', 'OVERLAY_INACTIVE');
    }
    
    try {
      await audioService.startRecording();
      // Don't dispatch SET_PROCESSING to avoid UI updates in main app
      dispatch({ type: 'SET_RECORDING', payload: true });
    } catch (error) {
      console.error('[useOverlay] Start recording error:', error);
      throw new OverlayError(
        error instanceof Error ? error.message : 'Failed to start recording',
        'RECORDING_START_FAILED'
      );
    }
  }, [isOverlayActive, audioService, dispatch]);

  const stopOverlayRecording = useCallback(async () => {
    if (!isOverlayActive) {
      throw new OverlayError('Overlay must be active to stop recording', 'OVERLAY_INACTIVE');
    }

    try {
      const uri = await audioService.stopRecording();
      dispatch({ type: 'SET_RECORDING', payload: false });
      
      if (uri) {
        await OverlayModule.transcribeAndInsertText(uri, new Promise<void>((resolve, reject) => {
          resolve();
        }));
      }
    } catch (error) {
      console.error('[useOverlay] Stop recording error:', error);
      throw new OverlayError(
        error instanceof Error ? error.message : 'Failed to stop recording',
        'RECORDING_STOP_FAILED'
      );
    }
  }, [isOverlayActive, audioService, transcriptionService, dispatch]);

  useEffect(() => {
    let isMounted = true;
    
    const setupEventListeners = async () => {
      if (Platform.OS !== 'android') return null;

      console.log('[useOverlay] Setting up event listeners');

      const subscriptions: SubscriptionsType = {
        start: eventEmitter.addListener('onStartRecording', async () => {
          if (!isMounted) return;
          try {
            await startOverlayRecording();
          } catch (error) {
            if (error instanceof OverlayError) {
              OverlayModule.onRecordingError?.(error.message);
            }
          }
        }),
        
        stop: eventEmitter.addListener('onStopRecording', async () => {
          if (!isMounted) return;
          try {
            await stopOverlayRecording();
          } catch (error) {
            if (error instanceof OverlayError) {
              OverlayModule.onRecordingError?.(error.message);
            }
          }
        }),
        
        error: eventEmitter.addListener('onRecordingError', (error: string) => {
          if (!isMounted) return;
          console.error('[useOverlay] Recording error event:', error);
          // Handle error (e.g., show toast or notification)
        })
      };

      return subscriptions;
    };

    const subscriptionsPromise = setupEventListeners();

    return () => {
      console.log('[useOverlay] Cleaning up event listeners');
      isMounted = false;
      subscriptionsPromise.then(subs => {
        if (subs) {
          Object.values(subs).forEach(sub => sub.remove());
        }
      });
    };
  }, [startOverlayRecording, stopOverlayRecording]);

  return {
    isOverlayActive,
    checkOverlayPermission,
    requestOverlayPermission,
    showOverlay,
    hideOverlay,
  } as const;
};
