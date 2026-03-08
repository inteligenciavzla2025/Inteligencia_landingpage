/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#000000",
                secondary: "#1a1a1a",
                "electric-orange": "#FF6B00",
                "tech-blue": "#007BFF",
                "structural-gray": "#333333",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Montserrat', 'sans-serif'],
            },
            backgroundImage: {
                'hero-gradient': 'radial-gradient(circle at center, rgba(0, 123, 255, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
