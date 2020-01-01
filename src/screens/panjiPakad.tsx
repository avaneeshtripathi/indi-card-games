import React from 'react';
import { ScrollView, Text, View, StyleSheet, TextInput } from 'react-native';
import AddPlayers from '@components/addPlayers';
import PlayerData from '@components/playerData';
import AddGameData from '@components/addGameData';
import RoundData from '@components/roundData';
import Touchable from '@components/touchable';
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
        backgroundColor: Theme.colors.screen.blueDark,
    },
    submitButtonText: {
        color: Theme.colors.text.white,
        textAlign: 'center',
        fontWeight: '900',
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
        currentStep: 2,
        gameLimit: 100,
        playerData: [
            { key: 1577892099643, label: 'HAFSHDSV', value: 0 },
            { key: 1577892100834, label: 'AJHGSDJHSDF', value: 0 },
            { key: 1577892101963, label: 'AJHFJSD', value: 0 },
            { key: 1577892103611, label: 'JAHGFJH', value: 0 },
        ],
        gameData: [
            {
                '1577892099643': { score: 0, label: 'HAFSHDSV' },
                '1577892100834': { score: 40, label: 'AJHGSDJHSDF' },
                '1577892101963': { score: 60, label: 'AJHFJSD' },
                '1577892103611': { score: 10, label: 'JAHGFJH' },
            },
            {
                '1577892099643': { score: 40, label: 'HAFSHDSV' },
                '1577892100834': { score: 0, label: 'AJHGSDJHSDF' },
                '1577892101963': { score: 30, label: 'AJHFJSD' },
                '1577892103611': { score: 40, label: 'JAHGFJH' },
            },
        ],
    };

    addPlayers = (playerData: TPlayer[]) =>
        this.setState(({ currentStep }) => ({
            playerData,
            currentStep: currentStep + 1,
        }));

    handleGameLimit = (limit: string) => this.setState({ gameLimit: Number(limit) });

    submitGameLimit = () => this.setState({ currentStep: this.state.currentStep + 1 });

    addGameData = (data: TGameData, callback: () => void) => {
        const { playerData, gameData } = this.state;

        let winnersCount = 0;
        playerData.forEach((player: TPlayer) => {
            if (data[player.key].score === 0) {
                winnersCount += 1;
            }
        });
        if (!winnersCount) return Helper.alert('Alert', 'There should be atleast one winner.');

        const updatedPlayerData = playerData.map((player: TPlayer) => ({
            ...player,
            value: player.value + data[player.key].score,
        }));

        this.setState(
            {
                gameData: [data, ...gameData],
                playerData: updatedPlayerData,
            },
            callback,
        );
    };

    showResults = () => {
        Helper.alert('Warning', 'This will end the session.', [
            { text: 'Cancel' },
            {
                text: 'Proceed',
                onPress: () => this.setState({ currentStep: this.state.currentStep + 1 }),
            },
        ]);
    };

    render() {
        const { currentStep, gameLimit, playerData, gameData } = this.state;

        const sortedPlayerData = [...playerData].sort(
            (player1: TPlayer, player2: TPlayer) => player2.value - player1.value,
        );

        return (
            <View style={styles.root}>
                <View style={styles.padHorizontal}>
                    <Text style={styles.gameHeader}>5 Cards Game</Text>
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
