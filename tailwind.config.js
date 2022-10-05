/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        "login-blue": "#0F172A",
        "sign-up": "#474979",
        "title": "#0F2146",
        "button-red": "#AC0D21",
        "whitesmoke": "#f5f5f5",
        "soft-grey":"#D9D9DA"
      },
    },
  },
  plugins: [],
};
