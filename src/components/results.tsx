import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { LineChart, LineChartData } from 'react-native-chart-kit';
import Theme from '@config/theme';
import Touchable from '@components/touchable';
import { TPlayer } from '@types';

const styles = StyleSheet.create({
    results: {
        display: 'flex',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 10,
        justifyContent: 'center',
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
        color: Theme.colors.text.secondary,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

type TProps = {
    gameData: any;
    playerData: TPlayer[];
    onResetGame: () => void;
};

export default ({ gameData, onResetGame, playerData }: TProps) => {
    const line: LineChartData = {
        legend: [],
        labels: [],
        datasets: [],
    };

    playerData.forEach((player: TPlayer, index: number) => {
        (line.legend as string[]).push(player.label);
        const data = [0];
        for (let i = gameData.length - 1; i >= 0; i--) {
            if (gameData[i][player.key]) {
                data.push(data[data.length - 1] + gameData[i][player.key].score);
            }
        }
        line.datasets.push({
            strokeWidth: 2,
            color: () => Theme.graphColors[index % 14],
            data,
        });
    });

    return (
        <View style={styles.results}>
            <LineChart
                data={line}
                width={Dimensions.get('window').width}
                height={200}
                withVerticalLabels={false}
                withHorizontalLabels={false}
                withInnerLines={false}
                withOuterLines={false}
                withShadow={false}
                chartConfig={{
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    labelColor: () => 'rgba(0, 0, 0, 1)',
                    decimalPlaces: 0,
                    color: () => 'rgba(0, 0, 0, 0)',
                    style: {
                        borderRadius: 16,
                    },
                }}
                bezier
            />
            <Touchable onPress={onResetGame}>
                <View style={styles.resetButton}>
                    <Text style={styles.resetButtonText}>Reset Game</Text>
                </View>
            </Touchable>
        </View>
    );
};
