import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import AddGameData from '@components/addGameData';
import AddPlayers from '@components/addPlayers';
import PlayerData from '@components/playerData';
import Results from '@components/teenPatti/results';
import RoundData from '@components/roundData';
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
        fontWeight: 'bold',
        color: Theme.colors.text.primary,
        textAlign: 'center',
        paddingVertical: 6,
        marginBottom: 6,
        borderBottomWidth: 1,
        borderColor: Theme.colors.border.primary,
    },
});

type TProps = {
    navigation: TNavigation;
};

type TState = {
    currentStep: number;
    playerData: TPlayer[];
    gameData: TGameData[];
    finalStats: {
        winner: TPlayer | null;
        loosers: TPlayer[];
    };
};

export default class TeenPatti extends React.Component<TProps, TState> {
    static navigationOptions = ({ navigation }: { navigation: TNavigation }) => AppHeader(navigation);

    state = {
        currentStep: 0,
        playerData: [],
        gameData: [],
        finalStats: { winner: null, loosers: [] },
    };

    addPlayers = (playerData: TPlayer[]) =>
        this.setState(({ currentStep }) => ({
            playerData,
            currentStep: currentStep + 1,
        }));

    addGameData = (data: TGameData, callback: () => void) => {
        const { playerData, gameData } = this.state;

        let winnersCount = 0;
        playerData.forEach((player: TPlayer) => {
            if (data[player.key].score === 0) {
                winnersCount += 1;
            }
        });
        if (winnersCount !== 1) return Helper.alert('Alert', 'There should be one winner.');

        let winnerIndex: number | undefined;
        let winningAmount = 0;

        const updatedPlayerData = playerData.map((player: TPlayer, index: number) => {
            if (data[player.key].score === 0) {
                winnerIndex = index;
            } else {
                player.value = player.value - data[player.key].score;
                winningAmount = winningAmount + data[player.key].score;
            }

            return player;
        });

        updatedPlayerData[winnerIndex as number].value += winningAmount;

        this.setState(
            {
                gameData: [data, ...gameData],
                playerData: updatedPlayerData,
            },
            callback,
        );
    };

    showResults = () => {
        const { currentStep, playerData } = this.state;

        const sortedData = [...playerData].sort((player1: TPlayer, player2: TPlayer) => player2.value - player1.value);

        const winner = {
            key: (sortedData[0] as TPlayer).key,
            label: (sortedData[0] as TPlayer).label,
            value: (sortedData[0] as TPlayer).value,
        };

        const loosers: TPlayer[] = [];
        sortedData.forEach((_, index) => {
            if (index !== 0) {
                loosers.push({
                    key: (sortedData[index] as TPlayer).key,
                    label: (sortedData[index] as TPlayer).label,
                    value: (sortedData[index] as TPlayer).value,
                });
            }
        });

        this.setState({
            currentStep: currentStep + 1,
            finalStats: {
                winner,
                loosers,
            },
        });
    };

    onResetGame = () => Helper.pushToRoute(this.props.navigation, 'Home', null);

    render() {
        const { currentStep, playerData, gameData, finalStats } = this.state;

        const sortedPlayerData = [...playerData].sort(
            (player1: TPlayer, player2: TPlayer) => player2.value - player1.value,
        );

        return (
            <View style={styles.root}>
                <View style={styles.padHorizontal}>
                    <Text style={styles.gameHeader}>3 Patti</Text>
                    {currentStep === 0 && <AddPlayers addPlayers={this.addPlayers} />}
                    {currentStep === 1 && (
                        <React.Fragment>
                            <PlayerData data={sortedPlayerData} />
                            <AddGameData
                                playerData={playerData}
                                addGameData={this.addGameData}
                                showResults={this.showResults}
                            />
                        </React.Fragment>
                    )}
                    {currentStep === 2 && <Results data={finalStats} onResetGame={this.onResetGame} />}
                </View>
                {currentStep === 1 && (
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
