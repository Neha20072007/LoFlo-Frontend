/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  plugins: [],

  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#f2f6f3",
          "100": "#e3ece5",
          "200": "#c5d9c7",
          "300": "#a2c4a3",
          "400": "#7dbf7b",  // Olive Green
          "500": "#66a966",  // More Green, Natural Tone
          "600": "#558b55",
          "700": "#457044",
          "800": "#345734",
          "900": "#274528",
          "950": "#1c3420",
        },
        secondary: {
          "50": "#f7faf7",
          "100": "#eff5ee",
          "200": "#dde7db",
          "300": "#b7d0b4",
          "400": "#8bb38d", // Softer Olive
          "500": "#739573", // Lofi Olive Shade
          "600": "#5e765e",
          "700": "#4a5f4a",
          "800": "#384a38",
          "900": "#283629",
          "950": "#1b251c",
        }
      }
    },

    fontFamily: {
      'body': [
        'Inter', 
        'ui-sans-serif', 
        'system-ui', 
        '-apple-system', 
        'system-ui', 
        'Segoe UI', 
        'Roboto', 
        'Helvetica Neue', 
        'Arial', 
        'Noto Sans', 
        'sans-serif', 
        'Apple Color Emoji', 
        'Segoe UI Emoji', 
        'Segoe UI Symbol', 
        'Noto Color Emoji'
      ],
      'sans': [
        'Inter', 
        'ui-sans-serif', 
        'system-ui', 
        '-apple-system', 
        'system-ui', 
        'Segoe UI', 
        'Roboto', 
        'Helvetica Neue', 
        'Arial', 
        'Noto Sans', 
        'sans-serif', 
        'Apple Color Emoji', 
        'Segoe UI Emoji', 
        'Segoe UI Symbol', 
        'Noto Color Emoji'
      ]
    }
  }
}
