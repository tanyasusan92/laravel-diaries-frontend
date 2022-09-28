/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  backgroundImage: {
    'work-desk': "url('./assets/leone-venter-VieM9BdZKFo-unsplash 1.png')",
    'work-desk-large': "url('./assets/leone-venter-VieM9BdZKFo-unsplash-large.jpg')",
    'split-white-blue': "linear-gradient(to top, #0096BE 50% , #E7E8E9 50%), linear-gradient(to right, red , yellow);"
  },

 
  theme: {
    extend: { colors: {
      'login-blue': '#0F172A',
      'sign-up': '#474979',
      'title':'#0F2146',
    },},
  },
  plugins: [],
}
