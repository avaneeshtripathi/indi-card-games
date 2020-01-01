import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import Theme from '@config/theme';
import Touchable from '@components/touchable';

const styles = StyleSheet.create({
    root: {
        backgroundColor: Theme.colors.screen.primary,
        borderColor: Theme.colors.border.primary,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        elevation: 6,
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
        borderColor: Theme.colors.border.primary,
        borderWidth: 4,
        borderRadius: 8,
    },
    gameLabel: {
        fontSize: 30,
        color: Theme.colors.text.tertiary,
    },
});

export default ({ data, onSelect }) => {
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
                    opacity={0.05}
                >
                    <View style={styles.cardWrapper}>
                        <Image style={styles.gameImage} source={data.image} />
                        <Text style={styles.gameLabel}>{data.label}</Text>
                    </View>
                </ImageBackground>
            </View>
        </Touchable>
    );
};
