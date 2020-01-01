import React from 'react';
import { ScrollView, Text, ImageBackground, View, StyleSheet } from 'react-native';
import Theme from '@config/theme';
import Touchable from '@components/touchable';
import Images from '@assets/images';
import { TPlayer } from '@types';

const styles = StyleSheet.create({
    results: {
        display: 'flex',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 10,
        justifyContent: 'center',
    },
    winnerImageCtr: {
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 4,
    },
    winerLabel: {
        color: Theme.colors.text.primary,
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
        position: 'absolute',
        top: 40,
    },
    winerScore: {
        color: Theme.colors.text.primary,
        fontSize: 14,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 40,
    },
    scrollViewContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 170,
    },
    looserListCtr: {
        display: 'flex',
        flexDirection: 'row',
    },
    looserImageCtr: {
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 4,
        borderWidth: 0.3,
        borderColor: Theme.colors.border.primary,
        elevation: 2,
    },
    looserLabelWrapper: {
        position: 'absolute',
        top: '50%',
        marginTop: -15,
    },
    looserLabel: {
        color: Theme.colors.text.primary,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 4,
    },
    looserScore: {
        color: Theme.colors.text.primary,
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    resetButton: {
        borderRadius: 4,
        paddingVertical: 9,
        paddingHorizontal: 10,
        width: '100%',
        backgroundColor: Theme.colors.screen.red,
        marginTop: 10,
    },
    resetButtonText: {
        color: Theme.colors.text.white,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

type TProps = {
    data: {
        winner: TPlayer;
        loosers: TPlayer[];
    };
    onResetGame: () => void;
};

export default ({ data: { winner, loosers }, onResetGame }: TProps) => {
    return (
        <View style={styles.results}>
            <View style={styles.winnerImageCtr}>
                <ImageBackground
                    source={Images.ace}
                    style={{
                        height: 198,
                        width: 141,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        elevation: 6,
                    }}
                    resizeMode="cover"
                >
                    <Text style={styles.winerLabel}>{winner.label}</Text>
                    <Text style={styles.winerScore}>+{winner.value}</Text>
                </ImageBackground>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContainerStyle}
            >
                {loosers.map((player, index) => (
                    <View key={index} style={[styles.looserImageCtr, { marginLeft: index === 0 ? 0 : 4 }]}>
                        <ImageBackground
                            source={Images.two}
                            style={{
                                height: 136.28,
                                width: 88.42,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                            }}
                            resizeMode="cover"
                        >
                            <View style={styles.looserLabelWrapper}>
                                <Text style={styles.looserLabel}>{player.label}</Text>
                                <Text style={styles.looserScore}>{player.value}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                ))}
            </ScrollView>

            <Touchable onPress={onResetGame}>
                <View style={styles.resetButton}>
                    <Text style={styles.resetButtonText}>Reset Game</Text>
                </View>
            </Touchable>
        </View>
    );
};
