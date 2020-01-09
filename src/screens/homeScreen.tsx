import React from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView, Text } from 'react-native';
import GameCard from '@components/gameCard';
import Theme from '@config/theme';
import { GAME_LIST } from '@config/config';
import Helper from '@utils/helper';
import AppHeader from '@utils/appHeader';
import { TGameCard, TNavigation } from '@types';

const styles = StyleSheet.create({
    root: {
        backgroundColor: Theme.colors.screen.primary,
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    appLogo: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    creditsCtr: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        left: 0,
    },
    creditLabel: {
        textAlign: 'center',
        color: Theme.colors.text.primary,
        fontWeight: 'bold',
        fontSize: 10,
    },
});

type TProps = {
    navigation: TNavigation;
};

type TState = {};

export default class HomeScreen extends React.Component<TProps, TState> {
    static navigationOptions = ({ navigation }: { navigation: TNavigation }) => AppHeader(navigation);

    componentDidCatch = (error: object) => {
        Helper.alert('Alert!', `${JSON.stringify(error)}`);
    };

    onGameSelect = (gameScreen: string) => Helper.pushToRoute(this.props.navigation, gameScreen, null);

    render() {
        return (
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <View style={styles.container}>
                        {GAME_LIST.map((game: TGameCard, index: number) =>
                            game.isEnabled ? <GameCard key={index} data={game} onSelect={this.onGameSelect} /> : null,
                        )}
                    </View>
                    <View style={styles.creditsCtr}>
                        <Text style={styles.creditLabel}>With ❤️ from @v!</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
