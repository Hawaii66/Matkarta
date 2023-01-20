/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            dropShadow: {
                card: "0 0 5px rgba(0, 0, 0, 0.3)",
            },
        },
    },
    plugins: [],
};