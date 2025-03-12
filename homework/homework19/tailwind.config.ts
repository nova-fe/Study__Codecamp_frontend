import type { Config } from 'tailwindcss';

export default {
  content: [
    // 디렉토리
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/commons/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        myColor1: 'blue',
        myColor2: 'green',
      },
    },
  },
  plugins: [],
} satisfies Config;
