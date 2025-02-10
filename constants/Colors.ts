// Base tint colors
export const tintColorLight = '#6C63FF';
export const tintColorDark = '#8B80FF';

// Gradient configurations
export const gradients = {
  primary: ['#6C63FF', '#4834DF'],
  secondary: ['#FF6B6B', '#FF8E8E'],
  accent: ['#4FACFE', '#00F2FE'],
  success: ['#48c6ef', '#6f86d6'],
  warning: ['#f6d365', '#fda085'],
  info: ['#84fab0', '#8fd3f4'],
};

export type Theme = {
  text: string;
  background: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
  // Additional UI colors
  primary: string;
  secondary: string;
  accent: string;
  surface: string;
  card: string;
  border: string;
  notification: string;
  // Gradient endpoints
  gradientStart: string;
  gradientEnd: string;
  // Status colors
  success: string;
  error: string;
  warning: string;
  info: string;
};

export type ThemeColors = {
  light: Theme;
  dark: Theme;
};

const Colors: ThemeColors = {
  light: {
    text: '#2D3436',
    background: '#F8F9FA',
    tint: tintColorLight,
    tabIconDefault: '#B2BEC3',
    tabIconSelected: tintColorLight,
    primary: '#6C63FF',
    secondary: '#FF6B6B',
    accent: '#4FACFE',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    border: '#E9ECEF',
    notification: '#FF6B6B',
    gradientStart: '#6C63FF',
    gradientEnd: '#4834DF',
    success: '#48c6ef',
    error: '#FF6B6B',
    warning: '#f6d365',
    info: '#84fab0',
  },
  dark: {
    text: '#F8F9FA',
    background: '#18191A',
    tint: tintColorDark,
    tabIconDefault: '#6C7072',
    tabIconSelected: tintColorDark,
    primary: '#8B80FF',
    secondary: '#FF8E8E',
    accent: '#00F2FE',
    surface: '#242526',
    card: '#242526',
    border: '#3E4042',
    notification: '#FF8E8E',
    gradientStart: '#8B80FF',
    gradientEnd: '#6C63FF',
    success: '#6f86d6',
    error: '#FF8E8E',
    warning: '#fda085',
    info: '#8fd3f4',
  },
};

export default Colors;
