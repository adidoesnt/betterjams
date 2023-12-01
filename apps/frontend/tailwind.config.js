/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                black: '#000000',
                white: '#FFFFFF',
                grey: '#222222',
                lavender: '#9373A1',
                beige: '#EFD8BE'
            },
            fontFamily: {
                lexend: ['Lexend Deca', 'sans-serif']
            }
        }
    },
    plugins: []
};
