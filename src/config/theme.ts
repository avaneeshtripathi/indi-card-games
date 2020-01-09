import { scale } from '@utils/scale';

const Colors = {
    white: '#ffffff',
    greyBlack: '#404553',

    greyLight: '#e2e5f1',
    greyLightest: '#f7f7fa',

    red: '#d43f3a',

    blue: '#337ab7',

    green: '#0f8a00',
};

const Fonts = {
    light: 'Roboto-Lightx',
    regular: 'Roboto-Regularx',
    bold: 'Roboto-Mediumx',
    logo: 'Righteous-Regularx',
};

const FontBaseValue = scale(18);

export default {
    name: 'noon',
    colors: {
        text: {
            primary: Colors.greyBlack,
            secondary: Colors.white,
        },
        screen: {
            primary: Colors.white,
            secondary: Colors.greyBlack,
            tertiary: Colors.greyLightest,
            blue: Colors.blue,
            green: Colors.green,
            red: Colors.red,
        },
        button: {
            primary: Colors.blue,
            secondary: Colors.white,
            tertiary: Colors.greyBlack,
            red: Colors.red,
            green: Colors.green,
        },
        border: {
            primary: Colors.greyLight,
            secondary: Colors.white,
            red: Colors.red,
            blue: Colors.blue,
        },
    },
    fonts: {
        sizes: {
            base: FontBaseValue,
            xsmall: FontBaseValue * 0.6,
            small: FontBaseValue * 0.8,
            medium: FontBaseValue,
            large: FontBaseValue * 1.2,
            xlarge: FontBaseValue / 0.75,
            xxlarge: FontBaseValue * 1.6,
        },
        family: {
            light: Fonts.light,
            regular: Fonts.regular,
            bold: Fonts.bold,
            logo: Fonts.logo,
        },
    },
    graphColors: [
        'rgba(150, 40, 27, 1)',
        'rgba(58, 83, 155, 1)',
        'rgba(30, 130, 76, 1)',
        'rgba(102, 51, 153, 1)',
        'rgba(244, 208, 63, 1)',
        'rgba(211, 84, 0, 1)',
        'rgba(46, 49, 49, 1)',
        'rgba(210, 77, 87, 1)',
        'rgba(34, 167, 240, 1)',
        'rgba(42, 187, 155, 1)',
        'rgba(103, 65, 114, 1)',
        'rgba(233, 212, 96, 1)',
        'rgba(242, 120, 75, 1)',
        'rgba(108, 122, 137, 1)',
    ],
};
