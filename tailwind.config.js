module.exports = {
    content: ["./*.{html,js}"],
    theme: {
        container: {
            center: true
        },
        extend: {
            fontFamily: {
                sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
                serif: ['Georgia', 'serif'],
            },
            colors: {
                primary: {
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
                    100: '#FDE3F4',
                    200: '#FFBFED',
                    300: '#FFA5E2',
                    400: '#FF8ED7',
                    500: '#F67CCA',
                    600: '#ea6cbd',
                    700: '#D55CAA',
                    800: '#BE4C96',
                    900: '#A73E82'
                },
                dark: '#2d2d2d',
                background: '#333333',
                accent: '#909090'
            },
        },
    }
}