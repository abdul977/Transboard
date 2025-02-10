import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import Colors, { gradients } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranscription } from '@/context/transcription';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function SettingsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const { clearAllTranscriptions } = useTranscription();
  const colors = Colors[colorScheme];

  const [autoSave, setAutoSave] = React.useState(true);
  const [highQualityAudio, setHighQualityAudio] = React.useState(true);

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all transcription history? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            clearAllTranscriptions()
              .then(() => {
                Alert.alert('History Cleared', 'All transcription history has been cleared.');
              })
              .catch((error: Error) => {
                Alert.alert('Error', 'Failed to clear history');
                console.error(error);
              });
          },
        },
      ]
    );
  };

  const renderSettingItem = (
    icon: keyof typeof FontAwesome.glyphMap,
    title: string,
    description?: string,
    rightElement?: React.ReactNode,
    isDestructive?: boolean
  ) => (
    <View style={styles.settingItem}>
      <View style={[
        styles.settingIcon,
        isDestructive && styles.destructiveIcon
      ]}>
        <LinearGradient
          colors={isDestructive ? 
            ['#FF3B30', '#FF6B6B'] as [string, string] : 
            gradients.primary as [string, string]}
          style={styles.iconGradient}
        >
          <FontAwesome 
            name={icon} 
            size={20} 
            color={colors.surface} 
          />
        </LinearGradient>
      </View>
      <View style={styles.settingContent}>
        <Text style={[
          styles.settingTitle,
          { color: colors.text },
          isDestructive && styles.destructiveText
        ]}>
          {title}
        </Text>
        {description && (
          <Text style={[
            styles.settingDescription,
            { color: colors.tabIconDefault }
          ]}>
            {description}
          </Text>
        )}
      </View>
      {rightElement}
    </View>
  );

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={[styles.section, { backgroundColor: colors.surface }]}>
      <LinearGradient
        colors={[colors.surface, colors.background]}
        style={styles.sectionGradient}
      >
        <Text style={[styles.sectionTitle, { color: colors.primary }]}>
          {title}
        </Text>
        {children}
      </LinearGradient>
    </View>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {renderSection(
        'Transcription Settings',
        <>
          {renderSettingItem(
            'check-circle',
            'Auto-save Transcriptions',
            'Automatically save transcriptions after recording',
            <Switch
              value={autoSave}
              onValueChange={setAutoSave}
              ios_backgroundColor={colors.border}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          )}
          {renderSettingItem(
            'microphone',
            'High Quality Audio',
            'Use higher quality audio recording (uses more storage)',
            <Switch
              value={highQualityAudio}
              onValueChange={setHighQualityAudio}
              ios_backgroundColor={colors.border}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          )}
        </>
      )}

      {renderSection(
        'Data Management',
        <TouchableOpacity 
          onPress={handleClearHistory}
          style={styles.destructiveButton}
        >
          {renderSettingItem(
            'trash',
            'Clear History',
            'Delete all saved transcriptions',
            undefined,
            true
          )}
        </TouchableOpacity>
      )}

      {renderSection(
        'About',
        <>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://your-app-privacy-policy.com')}
            style={styles.linkButton}
          >
            {renderSettingItem(
              'lock',
              'Privacy Policy',
              'Read our privacy policy'
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://your-app-terms.com')}
            style={styles.linkButton}
          >
            {renderSettingItem(
              'file-text-o',
              'Terms of Service',
              'Read our terms of service'
            )}
          </TouchableOpacity>
          {renderSettingItem(
            'info-circle',
            'Version',
            'Current version of the app',
            <Text style={[styles.versionText, { color: colors.tabIconDefault }]}>
              1.0.0
            </Text>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  section: {
    marginTop: 20,
    borderRadius: 20,
    marginHorizontal: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  sectionGradient: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginVertical: 4,
  },
  settingIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingDescription: {
    fontSize: 13,
    marginTop: 4,
  },
  versionText: {
    fontSize: 15,
    fontWeight: '500',
  },
  destructiveText: {
    color: '#FF3B30',
  },
  destructiveIcon: {
    opacity: 0.9,
  },
  destructiveButton: {
    opacity: 1,
  },
  linkButton: {
    opacity: 1,
  },
});
