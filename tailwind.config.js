/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './*.html',
        './*.js'
    ],
    theme: {
        extend: {
            colors: {
                'bg-dark': '#ffd1d1',
                'bg-light': '#ffe8e8',
                'text-main': '#e96f7f',
                'text-gray': '#ffb3b3',
                'text-pink': '#ff6b9d',
                'accent': '#ffd06a',
                'card-bg': '#fff5f5',
                'orange': '#ff944d'
            },
            fontFamily: {
                righteous: ['Righteous', 'cursive'],
                climate: ['Climate Crisis', 'sans-serif']
            }
        }
    },
    plugins: []
}
