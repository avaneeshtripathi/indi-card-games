import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ImageSourcePropType } from 'react-native';
import Theme from '@config/theme';
import Touchable from '@components/touchable';

const styles = StyleSheet.create({
    root: {
        backgroundColor: Theme.colors.screen.primary,
        borderRadius: 8,
        marginBottom: 20,
        elevation: 2,
        width: '100%',
    },
    cardWrapper: {
        paddingVertical: 30,
        paddingHorizontal: 15,
        display: 'flex',
        alignItems: 'center',
    },
    gameImage: {
        width: 80,
        height: 80,
        marginBottom: 10,
        borderColor: Theme.colors.border.orange,
        borderWidth: 4,
        borderRadius: 8,
    },
    gameLabelCtr: {
        paddingVertical: 6,
        width: '100%',
        alignItems: 'center',
        backgroundColor: Theme.colors.screen.primary,
        elevation: 2,
    },
    gameLabel: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Theme.colors.text.primary,
    },
});

type TProps = {
    data: {
        screen: string;
        image: ImageSourcePropType;
        label: string;
    };
    onSelect: (screen: string) => void;
};

export default ({ data, onSelect }: TProps) => {
    const onPress = () => onSelect(data.screen);

    return (
        <Touchable onPress={onPress}>
            <View style={styles.root}>
                <ImageBackground
                    source={data.image}
                    style={{
                        width: '100%',
                    }}
                    resizeMode="cover"
                    opacity={0.7}
                >
                    <View style={styles.cardWrapper}>
                        <Image style={styles.gameImage} source={data.image} />
                        <View style={styles.gameLabelCtr}>
                            <Text style={styles.gameLabel}>{data.label}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </Touchable>
    );
};
