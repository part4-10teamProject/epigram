import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // 'striped'라는 이름으로 줄무늬 배경을 정의

        'zigzag-pattern': "url('/assets/images/landing/img_zigzag.png')",

        striped:
          'repeating-linear-gradient(180deg, #f2f2f2, #f2f2f2 1px, #ffffff 1px, #ffffff 23px)',
      },
      backgroundRepeat: {
        'repeat-x': 'repeat-x',
      },

      fontFamily: {
        pretendard: ['Pretendard'],
        custom: ['IropkeBatang'],
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        black: {
          100: '#F9F9F9', //피그마에 나와있는 컬러입니다. 기본적인것만 넣었습나다.
          200: '#6B6B6B',
          300: '#5E5E5E',
          400: '#525252',
          500: '#454545',
          600: '#373737',
          700: '#2B2B2B',
          800: '#1F1F1F',
          900: '#121212',
          950: '#050505',
        },
        blue: {
          100: '#FFFFFF',
          200: '#ECEFF4',
          300: '#CBD3E1',
          400: '#ABB8CE',
          500: '#8B9DBC',
          600: '#6A82A9',
          700: '#52698E',
          800: '#40516E',
          900: '#2D394E',
          950: '#1A212D',
        },
        gray: {
          100: '#DEDEDE',
          200: '#C4C4C4',
          300: '#ABABAB',
          400: '#919191',
        },
        highlight: '#5195EE',
        background: '#F5F7FA',
        redState: '#FF6577',
        line: {
          100: '#F2F2F2',
          200: '#CFDBEA',
        }, // 라인 색상 추가했습니다
        'black-60': '#00000099', // 사이드창 열리고 오버레이할때 색상 (블랙에 투명60%)
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.125rem' }], // 12px / 18px
        sm: ['0.75rem', { lineHeight: '1.25rem' }], // 12px / 20px
        md: ['0.8125rem', { lineHeight: '1.375rem' }], // 13px / 22px
        lg: ['0.875rem', { lineHeight: '1.5rem' }], // 14px / 24px
        xl: ['1rem', { lineHeight: '1.625rem' }], // 16px / 26px
        '2xl': ['1.25rem', { lineHeight: '2rem' }], // 20px / 32px
        '3xl': ['2rem', { lineHeight: '2.625rem' }], // 32px / 42px
        '4xl': ['2.5rem', { lineHeight: '4rem' }], // 40px / 64px
      },
    },
    transform: ['responsive', 'hover', 'focus'],
    scale: {
      '-1': '-1',
    },
  },
  plugins: [],
};
export default config;
