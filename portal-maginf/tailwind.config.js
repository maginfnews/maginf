/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Identidade Visual MAGINF
        maginf: {
          orange: '#ff6a00',      // Laranja principal
          'orange-light': '#ff8533',
          'orange-dark': '#cc5500',
          dark: '#2d2d2d',        // Cinza escuro
          'dark-light': '#404040',
          gray: '#d9d9d9',        // Cinza claro
          'gray-dark': '#b3b3b3',
        },
        // Status colors
        status: {
          online: '#10b981',      // Verde
          offline: '#ef4444',     // Vermelho
          warning: '#f59e0b',     // Amarelo
          critical: '#dc2626',    // Vermelho escuro
        }
      },
      fontFamily: {
        'title': ['Montserrat', 'sans-serif'],  // Títulos
        'body': ['Inter', 'sans-serif'],        // Corpo
      },
      fontWeight: {
        'title': '700',  // Bold para títulos
      },
      borderRadius: {
        'maginf': '12px',  // Border radius padrão
      },
      boxShadow: {
        'maginf': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'maginf-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}
