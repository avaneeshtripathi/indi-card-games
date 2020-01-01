import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Theme from '@config/theme';
import { TGameData } from '@types';

const styles = StyleSheet.create({
    roundCtr: {
        marginBottom: 8,
    },
    roundLabelCtr: {
        display: 'flex',
        flexDirection: 'row',
    },
    emptyLabel: {
        flex: 1,
    },
    roundLabelWrapper: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        backgroundColor: Theme.colors.screen.blueDark,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    roundLabelText: {
        color: Theme.colors.text.white,
        fontWeight: 'bold',
    },
    roundDetailsCtr: {
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        borderTopRightRadius: 4,
        borderColor: Theme.colors.border.blueDark,
        borderWidth: 2,
    },
    playerData: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 2,
        paddingHorizontal: 4,
    },
    winner: {
        backgroundColor: Theme.colors.screen.green,
    },
    looser: {
        backgroundColor: Theme.colors.screen.primary,
    },
    secondRow: {
        borderTopWidth: 1,
        borderColor: Theme.colors.border.primary,
    },
    playerName: {
        color: Theme.colors.text.white,
        fontSize: 14,
        flex: 1,
        fontWeight: 'bold',
    },
    playerScore: {
        color: Theme.colors.text.white,
        fontSize: 14,
        flex: 1,
        paddingLeft: 10,
        borderLeftWidth: 1,
        borderColor: Theme.colors.border.primary,
        fontWeight: 'bold',
    },
    playerLooser: {
        color: Theme.colors.text.primary,
        fontWeight: 'normal',
    },
});

type TProps = {
    data: TGameData;
    round: number;
};

export default ({ data, round }: TProps) => {
    const playerList = Object.keys(data);

    return (
        <View style={styles.roundCtr}>
            <View style={styles.roundLabelCtr}>
                <View style={styles.roundLabelWrapper}>
                    <Text style={styles.roundLabelText}>Round {round}</Text>
                </View>
                <View style={styles.emptyLabel} />
            </View>
            <View style={styles.roundDetailsCtr}>
                {playerList.map((player: string, index: number) => (
                    <View
                        key={index}
                        style={StyleSheet.flatten([
                            styles.playerData,
                            data[player].score === 0 ? styles.winner : styles.looser,
                            index !== 0 ? styles.secondRow : null,
                        ])}
                    >
                        <Text
                            style={StyleSheet.flatten([
                                styles.playerName,
                                data[player].score === 0 ? {} : styles.playerLooser,
                            ])}
                        >
                            {data[player].label}
                        </Text>
                        <Text
                            style={StyleSheet.flatten([
                                styles.playerScore,
                                data[player].score === 0 ? {} : styles.playerLooser,
                            ])}
                        >
                            {data[player].score}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};
