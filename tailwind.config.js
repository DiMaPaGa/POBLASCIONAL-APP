/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",               // Si tienes un archivo HTML
    "./src/**/*.{js,jsx,ts,tsx}",  // Para procesar archivos JS y JSX de tu carpeta src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

