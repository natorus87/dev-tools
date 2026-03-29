import type { GlobalThemeOverrides } from 'naive-ui';

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontFamilyMono: '"Fira Code", monospace',
    primaryColor: '#18a058', // Standard green with better contrast on white
    primaryColorHover: '#36ad6a',
    primaryColorPressed: '#0c7a43',
    primaryColorSuppl: '#36ad6a1a',
    bodyColor: '#ffffff',
    cardColor: '#fcfcfc',
    modalColor: '#ffffff',
    textColorBase: '#1f2937',
    textColor1: '#374151',
    textColor2: '#4b5563',
    borderColor: '#e5e7eb',
  },
  Menu: {
    itemHeight: '32px',
    textColor: '#374151',
    itemColorActive: '#18a0581a',
  },
  Layout: {
    color: '#ffffff',
    siderColor: '#f9fafb',
    headerColor: '#f9fafb',
    siderBorderColor: '#e5e7eb',
  },
  Card: {
    color: '#ffffff',
    borderColor: '#e5e7eb',
  },
  Table: {
    tdColor: '#ffffff',
    thColor: '#f9fafb',
    borderColor: '#e5e7eb',
  },
  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px', color: '#ffffff' },
    },
  },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontFamilyMono: '"Fira Code", monospace',
    primaryColor: '#39ff14',
    primaryColorHover: '#00ff41',
    primaryColorPressed: '#00cc33',
    primaryColorSuppl: '#39ff141a',
    bodyColor: '#0b0e14',
    cardColor: '#161b22',
    modalColor: '#161b22',
    textColorBase: '#ffffff',
    textColor1: '#e6edf3',
    textColor2: '#c9d1d9',
  },

  Notification: {
    color: '#161b22',
    textColor: '#e6edf3',
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px', color: '#161b22' },
    },
  },

  Menu: {
    itemHeight: '32px',
    fontSize: '14px',
  },

  Layout: {
    color: '#0b0e14',
    siderColor: '#0d1117',
    siderBorderColor: '#30363d',
    headerColor: '#0d1117',
  },

  Card: {
    color: '#161b22',
    borderColor: '#30363d',
  },

  Table: {
    tdColor: '#161b22',
    thColor: '#21262d',
    borderColor: '#30363d',
  },
};
