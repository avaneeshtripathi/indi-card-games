import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Theme from '@config/theme';
import { TPlayer } from '@types';

const styles = StyleSheet.create({
    playerList: {
        width: '100%',
        paddingBottom: 6,
        marginBottom: 8,
        borderBottomWidth: 1,
        borderColor: Theme.colors.border.primary,
        display: 'flex',
        flexDirection: 'column',
    },
    labelCtr: {
        paddingVertical: 2,
        display: 'flex',
        flexDirection: 'row',
    },
    playerName: {
        color: Theme.colors.screen.green,
        fontWeight: 'bold',
        fontSize: 14,
        flex: 1,
    },
    playerScore: {
        color: Theme.colors.screen.green,
        fontWeight: 'bold',
        fontSize: 14,
        flex: 1,
    },
    lineThrough: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: Theme.colors.screen.red,
    },
});

type TProps = {
    data: TPlayer[];
};

export default ({ data }: TProps) => {
    return (
        <View style={styles.playerList}>
            {data.map((player: TPlayer, index: number) => (
                <React.Fragment key={index}>
                    <View style={styles.labelCtr}>
                        <Text style={StyleSheet.flatten([styles.playerName, player.invalid ? styles.lineThrough : {}])}>
                            {player.label}
                        </Text>
                        <Text
                            style={StyleSheet.flatten([styles.playerScore, player.invalid ? styles.lineThrough : {}])}
                        >
                            {player.value > 0 ? `+${player.value}` : player.value}
                        </Text>
                    </View>
                </React.Fragment>
            ))}
        </View>
    );
};
