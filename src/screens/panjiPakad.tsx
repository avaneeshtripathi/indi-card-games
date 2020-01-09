import React from 'react';
import { ScrollView, Text, View, StyleSheet, TextInput } from 'react-native';
import AddPlayers from '@components/addPlayers';
import PlayerData from '@components/playerData';
import AddGameData from '@components/addGameData';
import RoundData from '@components/roundData';
import Touchable from '@components/touchable';
import Results from '@components/results';
import Theme from '@config/theme';
import AppHeader from '@utils/appHeader';
import Helper from '@utils/helper';
import { TNavigation, TPlayer, TGameData } from '@types';

const styles = StyleSheet.create({
    root: {
        backgroundColor: Theme.colors.screen.primary,
        height: '100%',
    },
    padHorizontal: {
        paddingHorizontal: 20,
    },
    gameHeader: {
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: Theme.colors.text.primary,
        textAlign: 'center',
        paddingVertical: 6,
        marginBottom: 6,
        borderBottomWidth: 1,
        borderColor: Theme.colors.border.primary,
    },
    limitInput: {
        borderColor: Theme.colors.border.primary,
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 10,
        width: '100%',
        fontSize: 14,
        marginBottom: 10,
    },
    submitButton: {
        borderRadius: 4,
        paddingVertical: 9,
        paddingHorizontal: 10,
        width: '100%',
        backgroundColor: Theme.colors.screen.blue,
    },
    submitButtonText: {
        color: Theme.colors.text.secondary,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

type TProps = {
    navigation: TNavigation;
};

type TState = {
    currentStep: number;
    gameLimit: number;
    playerData: TPlayer[];
    gameData: TGameData[];
};

export default class PanjiPakad extends React.Component<TProps, TState> {
    static navigationOptions = ({ navigation }: { navigation: TNavigation }) => AppHeader(navigation);

    state = {
        currentStep: 0,
        gameLimit: 0,
        playerData: [],
        gameData: [],
    };

    addPlayers = (playerData: TPlayer[]) =>
        this.setState(({ currentStep }) => ({
            playerData,
            currentStep: currentStep + 1,
        }));

    handleGameLimit = (limit: string) => this.setState({ gameLimit: Number(limit) });

    submitGameLimit = () => this.setState({ currentStep: this.state.currentStep + 1 });

    addGameData = (data: TGameData, callback: () => void) => {
        const { playerData, gameData, gameLimit } = this.state;

        let winnersCount = 0;
        playerData.forEach((player: TPlayer) => {
            if (data[player.key] && data[player.key].score === 0) {
                winnersCount += 1;
            }
        });
        if (!winnersCount) return Helper.alert('Alert', 'There should be atleast one winner.');

        let invalidPlayers = 0;
        const updatedPlayerData = playerData.map((player: TPlayer) => {
            const value = player.value + (data[player.key] ? data[player.key].score : 0);
            if (value >= gameLimit) invalidPlayers++;
            const newPlayer = {
                ...player,
                value,
                invalid: value >= gameLimit,
            };

            return newPlayer;
        });

        this.setState(
            {
                gameData: [data, ...gameData],
                playerData: updatedPlayerData,
            },
            () => {
                callback();
                if (invalidPlayers >= playerData.length - 1) {
                    this.showFinalStats();
                }
            },
        );
    };

    showResults = () => {
        Helper.alert('Warning', 'This will end the session.', [
            { text: 'Cancel' },
            {
                text: 'Proceed',
                onPress: this.showFinalStats,
            },
        ]);
    };

    showFinalStats = () => {
        this.setState({ currentStep: this.state.currentStep + 1 });
    };

    onResetGame = () => {
        Helper.alert('Warning', 'This will reset any game in progress.', [
            { text: 'Cancel' },
            {
                text: 'Proceed',
                onPress: () => Helper.pushToRoute(this.props.navigation, 'Home'),
            },
        ]);
    };

    render() {
        const { currentStep, gameLimit, playerData, gameData } = this.state;

        const sortedPlayerData = [...playerData].sort(
            (player1: TPlayer, player2: TPlayer) => player1.value - player2.value,
        );

        return (
            <View style={styles.root}>
                <View style={styles.padHorizontal}>
                    <Text style={styles.gameHeader}>
                        5 Cards Game {gameLimit > 0 && currentStep >= 2 ? `(Limit: ${gameLimit})` : ''}
                    </Text>
                    {currentStep === 0 && <AddPlayers addPlayers={this.addPlayers} label="Submit Players !" />}
                    {currentStep === 1 && (
                        <React.Fragment>
                            <TextInput
                                autoFocus
                                style={styles.limitInput}
                                onChangeText={this.handleGameLimit}
                                value={gameLimit ? String(gameLimit) : ''}
                                placeholder="Enter Game Limit"
                                keyboardType="numeric"
                            />
                            <Touchable onPress={this.submitGameLimit}>
                                <View style={styles.submitButton}>
                                    <Text style={styles.submitButtonText}>Start Game !</Text>
                                </View>
                            </Touchable>
                        </React.Fragment>
                    )}
                    {currentStep === 2 && (
                        <React.Fragment>
                            <PlayerData data={sortedPlayerData} />
                            <AddGameData
                                playerData={playerData}
                                addGameData={this.addGameData}
                                showResults={this.showResults}
                            />
                        </React.Fragment>
                    )}
                    {currentStep === 3 && (
                        <Results playerData={playerData} gameData={gameData} onResetGame={this.onResetGame} />
                    )}
                </View>
                {currentStep === 2 && (
                    <ScrollView style={styles.padHorizontal}>
                        {gameData.map((round: TGameData, index: number) => (
                            <RoundData key={index} round={gameData.length - index} data={round} />
                        ))}
                    </ScrollView>
                )}
            </View>
        );
    }
}
