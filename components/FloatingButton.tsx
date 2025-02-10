import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  ViewStyle,
  Platform,
  View,
  Easing,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useTranscription } from '@/context/transcription';
import { useOverlay } from '@/hooks/useOverlay';
import { LinearGradient } from 'expo-linear-gradient';
import Colors, { gradients } from '@/constants/Colors';

interface FloatingButtonProps {
  style?: ViewStyle;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({ style }) => {
  const { state, startRecording, stopRecording } = useTranscription();
  const { showOverlay, hideOverlay, checkOverlayPermission } = useOverlay();
  const [isOverlayMode, setIsOverlayMode] = useState(false);
  const scale = React.useRef(new Animated.Value(1)).current;
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  // Pulse animation when recording
  useEffect(() => {
    let pulseAnimation: Animated.CompositeAnimation;
    
    if (state.isRecording) {
      pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
    }

    return () => {
      if (pulseAnimation) {
        pulseAnimation.stop();
      }
      pulseAnim.setValue(1);
    };
  }, [state.isRecording, pulseAnim]);

  const handlePress = useCallback(async () => {
    // Trigger haptic feedback
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Animate button press with spring animation for more natural feel
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 0.8,
        useNativeDriver: true,
        damping: 15,
        stiffness: 300,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        damping: 15,
        stiffness: 300,
      }),
    ]).start();

    // Toggle recording
    if (state.isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  }, [state.isRecording, startRecording, stopRecording, scale]);

  const handleLongPress = useCallback(async () => {
    if (Platform.OS !== 'android') {
      Alert.alert('Not Available', 'Overlay mode is only available on Android devices.');
      return;
    }

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    if (!isOverlayMode) {
      const hasPermission = await checkOverlayPermission();
      if (hasPermission) {
        await showOverlay();
        setIsOverlayMode(true);
      } else {
        Alert.alert(
          'Permission Required',
          'Please grant overlay permission to use this feature.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: async () => {
                // Permission request is handled in the native module
                const granted = await showOverlay();
                if (granted) {
                  setIsOverlayMode(true);
                }
              },
            },
          ]
        );
      }
    } else {
      await hideOverlay();
      setIsOverlayMode(false);
    }
  }, [isOverlayMode, showOverlay, hideOverlay, checkOverlayPermission]);

  // Cast gradient arrays to tuples for TypeScript
  const primaryGradient = gradients.primary as [string, string];
  const secondaryGradient = ['#FF3B30', '#FF6B6B'] as [string, string];

  const rippleStyle = {
    transform: [{ scale: pulseAnim }],
    opacity: pulseAnim.interpolate({
      inputRange: [1, 1.3],
      outputRange: [0.2, 0],
    }),
  };

  if (isOverlayMode && Platform.OS === 'android') {
    return null; // Hide the button in overlay mode on Android
  }

  return (
    <View style={[styles.container, style]}>
      <Animated.View 
        style={[
          styles.buttonContainer,
          { transform: [{ scale }] }
        ]}
      >
        <TouchableOpacity
          onPress={handlePress}
          onLongPress={handleLongPress}
          delayLongPress={800}
          style={styles.button}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={state.isRecording ? secondaryGradient : primaryGradient}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <FontAwesome
              name={state.isRecording ? 'stop-circle' : 'microphone'}
              size={28}
              color={Colors.light.surface}
            />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
      {state.isRecording && (
        <Animated.View style={[styles.ripple, rippleStyle]}>
          <View style={styles.rippleCircle} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.select({ ios: 100, android: 80 }),
    right: 20,
    zIndex: 1000,
    alignItems: 'center',
  },
  buttonContainer: {
    shadowColor: Colors.light.text,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ripple: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  rippleCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: Colors.light.error,
  },
});
