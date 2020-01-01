import React from 'react';
import { TouchableNativeFeedback } from 'react-native';

type TProps = {
    children: JSX.Element;
    onPress: () => void;
    traits?: {
        [key: string]: string;
    };
};

export default ({ children, onPress, traits = {} }: TProps) =>
    !onPress ? (
        children
    ) : (
        <TouchableNativeFeedback {...traits} onPress={onPress}>
            {children}
        </TouchableNativeFeedback>
    );
