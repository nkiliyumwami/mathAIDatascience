/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#122033',
        mist: '#eef5ff',
        slateblue: '#335c81',
        ember: '#ff7a59',
        pine: '#1f6f61',
        sand: '#f8eedb',
      },
      boxShadow: {
        glow: '0 20px 50px rgba(18, 32, 51, 0.15)',
      },
      fontFamily: {
        display: ['Avenir Next', 'Trebuchet MS', 'Segoe UI', 'sans-serif'],
        body: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      backgroundImage: {
        mesh:
          'radial-gradient(circle at top left, rgba(255,255,255,0.9), transparent 40%), radial-gradient(circle at 80% 20%, rgba(255,122,89,0.18), transparent 25%), linear-gradient(135deg, #eff6ff 0%, #ffffff 45%, #f8eedb 100%)',
      },
    },
  },
  plugins: [],
}
