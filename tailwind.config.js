module.exports = {
    content: ["./*.{html,js}"],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                md: '3rem',
                lg: '2.5rem',
                xl: '5rem',
                '2xl': '6rem'
            }
        },
        extend: {
            fontFamily: {
                sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
                serif: ['Georgia', 'serif'],
            },
            colors: {

                primary: {
                     50: '#F3EEFA',
                    100: '#DDD2FA',
                    200: '#BDA8F1',
                    300: '#9F7EE4',
                    400: '#8154D2',
                    500: '#642BBD',
                    600: '#480DA3',
                    700: '#3F0696',
                    800: '#360189',
                    900: '#2E0079'
                },
                secondary: {
                    50: '#FEF5FB',
                    100: '#FDE3F4',
                    200: '#FFBFED',
                    300: '#FFA5E2',
                    400: '#FF8ED7',
                    500: '#F67CCA',
                    600: '#EA6CBD',
                    700: '#D55CAA',
                    800: '#BE4C96',
                    900: '#A73E82'
                },
                'primary-light': "rgba(73, 13, 163, 0.05)",
                title: '#2D1D61',
                grey: '#363049',
                dark: '#2d2d2d',
                background: '#333333',
                accent: '#909090'
            },
        },
    }
}