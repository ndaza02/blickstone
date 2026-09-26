tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
            colors: {
                // Palette lifted from the BlickStone corporate identity
                blick: {
                    navy: '#0B2F6B',     // wordmark navy
                    deep: '#061426',     // document background navy
                    midnight: '#0E2948', // panel navy
                    red: '#E21B23',      // accent red
                    darkRed: '#C5121B',
                    blue: '#0072CE',     // secondary blue
                    steel: '#D9E0E8',
                    ink: '#17202A',
                    gray: '#6F7378',
                    offWhite: '#F3F6F9',
                }
            },
            borderRadius: {
                '4xl': '2.5rem',
                '5xl': '3.5rem',
            }
        }
    }
}
