import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import Theme from '@config/theme';
import AppHeader from '@utils/appHeader';
import { TNavigation } from '@types';

const styles = StyleSheet.create({
    root: {
        backgroundColor: Theme.colors.screen.primary,
    },
});

type TProps = {
    navigation: TNavigation;
};

type TState = {};

export default class PanjiPakad extends React.Component<TProps, TState> {
    static navigationOptions = ({ navigation }: { navigation: TNavigation }) => AppHeader(navigation);

    render() {
        return (
            <ScrollView style={styles.root}>
                <View>
                    <Text>Panji Pakad page</Text>
                </View>
            </ScrollView>
        );
    }
}
