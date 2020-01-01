import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import Theme from '@config/theme';
import Touchable from '@components/touchable';
import Helper from '@utils/helper';
import { TPlayer, TGameData } from '@types';

const styles = StyleSheet.create({
    root: {
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: Theme.colors.border.primary,
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonCtr: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: Theme.colors.screen.blueDark,
        borderRadius: 4,
        elevation: 4,
    },
    buttonText: {
        color: Theme.colors.text.white,
        fontWeight: 'bold',
    },
    formField: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        borderColor: Theme.colors.border.primary,
        borderWidth: 1,
        borderRadius: 2,
        paddingVertical: 0,
        paddingHorizontal: 10,
        fontSize: 13,
        flex: 1,
    },
    playerName: {
        flex: 1,
        fontSize: 14,
    },
});

type TProps = {
    playerData: TPlayer[];
    addGameData: (gameData: TGameData, cb: () => void) => void;
    showResults: () => void;
};

type TState = {
    addingData: boolean;
};

export default class AddGameData extends React.Component<TProps, TState> {
    state = {
        addingData: false,
    };

    toggleAddGameData = () => this.setState({ addingData: !this.state.addingData });

    submitScore = () => {
        const { playerData, addGameData } = this.props;
        let invalidData = false;
        let payload = {};

        playerData.forEach((player: TPlayer) => {
            if (this[`${player.key}-input`]) {
                const value = this[`${player.key}-input`]._lastNativeText;
                invalidData = invalidData || isNaN(value);
                payload = {
                    ...payload,
                    [player.key]: { score: Number(value), label: player.label },
                };
            }
        });

        if (invalidData) return Helper.alert('Alert', 'Invalid data.');

        addGameData(payload, () => this.setState({ addingData: false }));
    };

    render() {
        const { addingData } = this.state;
        const { playerData, showResults } = this.props;

        return (
            <View style={styles.root}>
                {!addingData && (
                    <View style={styles.buttonWrapper}>
                        <Touchable onPress={showResults}>
                            <View style={styles.buttonCtr}>
                                <Text style={styles.buttonText}>Show Results</Text>
                            </View>
                        </Touchable>
                        <Touchable onPress={this.toggleAddGameData}>
                            <View style={styles.buttonCtr}>
                                <Text style={styles.buttonText}>Add Score</Text>
                            </View>
                        </Touchable>
                    </View>
                )}
                {addingData && (
                    <View>
                        {playerData.map((player, index) => (
                            <View key={index} style={styles.formField}>
                                <Text style={styles.playerName}>{player.label}</Text>
                                <TextInput
                                    ref={input => (this[`${player.key}-input`] = input)}
                                    style={styles.input}
                                    placeholder="Add Score"
                                    keyboardType={'numeric'}
                                />
                            </View>
                        ))}
                        <View style={styles.buttonWrapper}>
                            <Touchable onPress={this.toggleAddGameData}>
                                <View style={styles.buttonCtr}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </View>
                            </Touchable>
                            <Touchable onPress={this.submitScore}>
                                <View style={styles.buttonCtr}>
                                    <Text style={styles.buttonText}>Submit Score</Text>
                                </View>
                            </Touchable>
                        </View>
                    </View>
                )}
            </View>
        );
    }
}
