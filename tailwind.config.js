// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        goldenTan: '#e7b76e',
     }
    },
  },
  plugins: [
    
    require('animated-tailwindcss'),
  ],
}
