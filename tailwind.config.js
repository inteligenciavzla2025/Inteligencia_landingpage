/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#020202",
                secondary: "#1a1a1a",
                "electric-orange": "#FF6B00",
                "tech-blue": "#007BFF",
                "structural-gray": "#333333",
                black: "#020202",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Montserrat', 'sans-serif'],
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
