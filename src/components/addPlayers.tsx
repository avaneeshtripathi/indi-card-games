import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import Theme from '@config/theme';
import Touchable from '@components/touchable';
import Helper from '@utils/helper';
import { TPlayer } from '@types';

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 10,
    },
    input: {
        borderColor: Theme.colors.border.primary,
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 10,
        width: '100%',
        fontSize: 14,
        marginBottom: 10,
    },
    startButton: {
        borderRadius: 4,
        paddingVertical: 9,
        paddingHorizontal: 10,
        width: '100%',
        backgroundColor: Theme.colors.screen.blueDark,
    },
    playerList: {
        width: '100%',
        marginBottom: 10,
    },
    playerName: {
        color: Theme.colors.text.primary,
        fontWeight: 'bold',
        fontSize: 14,
    },
    startButtonText: {
        color: Theme.colors.text.white,
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 14,
    },
});

type TProps = {
    addPlayers: (players: TPlayer[]) => void;
    label?: string;
};

type TState = {
    players: TPlayer[];
};

export default class AddPlayers extends React.Component<TProps, TState> {
    state = {
        players: [],
    };

    textInput: TextInput | null = null;

    onSubmitEditing = ({ nativeEvent }: { nativeEvent: any }) => {
        if (!nativeEvent.text) return this.resetInput();

        const playerName = nativeEvent.text.toUpperCase();
        this.setState(
            ({ players }) => ({
                players: [...players, { key: new Date().getTime(), label: playerName, value: 0 }],
            }),
            this.resetInput,
        );
    };

    resetInput = () => {
        if (!this.textInput) return;

        this.textInput.clear();
        setTimeout(this.textInput.focus, 0);
    };

    addPlayers = () => {
        const { players } = this.state;
        if (!players || !players.length) return Helper.alert('Alert', 'No Players Added.');

        this.props.addPlayers(players);
    };

    render() {
        const { players } = this.state;
        const { label: buttonLabel } = this.props;

        return (
            <View style={styles.root}>
                <TextInput
                    ref={input => (this.textInput = input)}
                    autoFocus
                    style={styles.input}
                    onSubmitEditing={this.onSubmitEditing}
                    placeholder="Enter Player Name"
                />
                {players && players.length ? (
                    <View style={styles.playerList}>
                        {players.map(({ label }, index) => (
                            <Text style={styles.playerName} key={index}>
                                {index + 1}. {label}
                            </Text>
                        ))}
                    </View>
                ) : null}
                <Touchable onPress={this.addPlayers}>
                    <View style={styles.startButton}>
                        <Text style={styles.startButtonText}>{buttonLabel || `Start Game !`}</Text>
                    </View>
                </Touchable>
            </View>
        );
    }
}
