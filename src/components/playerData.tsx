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
        color: Theme.colors.text.primary,
        fontWeight: 'bold',
        fontSize: 14,
        flex: 1,
    },
    playerScore: {
        color: Theme.colors.text.primary,
        fontWeight: 'bold',
        fontSize: 14,
        flex: 1,
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
                        <Text style={styles.playerName}>{player.label}</Text>
                        <Text style={styles.playerScore}>{player.value}</Text>
                    </View>
                </React.Fragment>
            ))}
        </View>
    );
};
