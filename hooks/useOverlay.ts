import { useEffect } from 'react';
import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import { useTranscription } from '@/context/transcription';

const { OverlayModule } = NativeModules;

interface OverlayModuleInterface {
  checkPermission(): Promise<boolean>;
  requestPermission(): Promise<boolean>;
  showOverlay(): Promise<boolean>;
  hideOverlay(): Promise<boolean>;
}

const eventEmitter = new NativeEventEmitter(OverlayModule);

export const useOverlay = () => {
  const { startRecording, stopRecording } = useTranscription();

  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const startSubscription = eventEmitter.addListener(
      'onStartRecording',
      () => {
        startRecording();
      }
    );

    const stopSubscription = eventEmitter.addListener(
      'onStopRecording',
      () => {
        stopRecording();
      }
    );

    return () => {
      startSubscription.remove();
      stopSubscription.remove();
    };
  }, [startRecording, stopRecording]);

  const checkOverlayPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return false;
    try {
      return await OverlayModule.checkPermission();
    } catch (error) {
      console.error('Error checking overlay permission:', error);
      return false;
    }
  };

  const requestOverlayPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return false;
    try {
      return await OverlayModule.requestPermission();
    } catch (error) {
      console.error('Error requesting overlay permission:', error);
      return false;
    }
  };

  const showOverlay = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return false;
    try {
      const hasPermission = await checkOverlayPermission();
      if (!hasPermission) {
        const granted = await requestOverlayPermission();
        if (!granted) return false;
      }
      return await OverlayModule.showOverlay();
    } catch (error) {
      console.error('Error showing overlay:', error);
      return false;
    }
  };

  const hideOverlay = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return false;
    try {
      return await OverlayModule.hideOverlay();
    } catch (error) {
      console.error('Error hiding overlay:', error);
      return false;
    }
  };

  return {
    checkOverlayPermission,
    requestOverlayPermission,
    showOverlay,
    hideOverlay,
  };
};