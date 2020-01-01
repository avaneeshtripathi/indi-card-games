import { scale } from '@utils/scale';

const Colors = {
    white: '#ffffff',
    greyBlack: '#404553',

    greyDark: '#777777',
    greyLight: '#bcbcbc',
    greyLighter: '#e2e5f1',
    greyLightest: '#f7f7fa',
    greyTransparent: '#00000057',

    red: '#ed1c4d',
    redLight: '#ff4747',
    redLightest: '#ffdddd',

    orange: '#fecb51',
    orangeLight: '#fff4dc',

    blue: '#3866df',
    blueLight: '#4f79df',
    blueLightest: '#dee8ff',

    green: '#7ed321',
    greenLight: '#f0ffdf',

    yellow: '#feee00',
    yellowLight: '#fffddf',
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
            secondary: Colors.greyDark,
            tertiary: Colors.greyLight,
            white: Colors.white,
            blue: Colors.blue,
            error: Colors.red,
            success: Colors.green,
        },
        screen: {
            primary: Colors.white,
            secondary: Colors.greyLightest,
            tertiary: Colors.yellow,
            overlay: Colors.greyTransparent,
            yellow: Colors.yellowLight,
            orange: Colors.orangeLight,
            blue: Colors.blueLightest,
            blueDark: Colors.blue,
            success: Colors.greenLight,
            error: Colors.redLightest,
            red: Colors.red,
            green: Colors.green,
        },
        button: {
            primary: Colors.blue,
            secondary: Colors.white,
            error: Colors.red,
            warning: Colors.redLight,
        },
        border: {
            primary: Colors.greyLighter,
            error: Colors.red,
            blue: Colors.blueLight,
            green: Colors.green,
            orange: Colors.orange,
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
};
