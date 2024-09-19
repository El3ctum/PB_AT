/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '10px',
        xl: '12px',
        '2xl': '16px',
      },
      backgroundImage: {
        'circles': 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 20%, transparent 30%)',
      },
      backgroundSize: {
        '50': '50px 50px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // If needed
    require('@tailwindcss/typography'), // If needed
  ],
}
