import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

import { presetScrollbar } from 'unocss-preset-scrollbar';

export default defineConfig({
  presets: [presetUno(), presetAttributify({ ignoreAttributes: ['size'] }), presetTypography(), presetScrollbar()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      primary: '#00ff41', // Matrix Green
      accent: '#00f3ff',  // Cyber Cyan
      highlight: '#e06cff', // Neon Purple
      deep: '#0b0e14',   // Deepest Black
      surface: '#161b22', // GitHub Dark Surface
    },
    fontFamily: {
      mono: ['"Fira Code"', 'monospace'],
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
  },
  shortcuts: {
    'pretty-scrollbar': 'scrollbar scrollbar-rounded scrollbar-thumb-color-primary/30 scrollbar-track-color-transparent dark:scrollbar-thumb-color-primary/20 dark:scrollbar-track-color-transparent',
    'divider': 'h-1px bg-current op-10',
    'bg-surface': 'bg-surface dark:bg-deep',
    'bg-background': 'bg-slate-50 dark:bg-deep',
    'card-nerd': 'border border-primary/20 bg-surface/50 backdrop-blur-md rounded-lg p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(0,255,65,0.1)]',
    'btn-nerd': 'font-mono uppercase tracking-wider border border-primary/50 px-4 py-2 rounded-md hover:bg-primary hover:text-deep transition-all duration-200',
  },
});
