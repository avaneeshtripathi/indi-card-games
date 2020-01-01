import { ImageSourcePropType } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

export type TNavigation = NavigationStackProp;

export type TGameCard = {
    key: string;
    label: string;
    image: ImageSourcePropType;
    screen: string;
    isEnabled: boolean;
};

export type TPlayer = {
    key: number;
    label: string;
    value: number;
    invalid?: boolean;
};

export type TGameData = {
    [key: string]: {
        score: number;
        label: string;
    };
};
