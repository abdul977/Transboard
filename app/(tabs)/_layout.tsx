import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useColorScheme, Platform } from 'react-native';
import Colors, { gradients } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

// Create a custom background component for the header
function HeaderBackground() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = [
    Colors[colorScheme].background,
    Colors[colorScheme].surface
  ] as [string, string];

  return (
    <LinearGradient
      colors={colors}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          height: Platform.select({ ios: 88, android: 68 }),
          paddingBottom: Platform.select({ ios: 28, android: 8 }),
          paddingTop: 8,
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        headerStyle: {
          height: Platform.select({ ios: 120, android: 100 }),
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: 'transparent',
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '600',
          color: colors.text,
        },
        headerBackground: HeaderBackground,
        headerShadowVisible: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Transcriptions',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome 
              name="microphone" 
              size={24} 
              color={color}
              style={{
                opacity: focused ? 1 : 0.8,
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome 
              name="gear" 
              size={24} 
              color={color}
              style={{
                opacity: focused ? 1 : 0.8,
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
    </Tabs>
  );
}
