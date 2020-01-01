/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '@screens/homeScreen';
import TeenPatti from '@screens/teenPatti';
import PanjiPakad from '@screens/panjiPakad';

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        // navigationOptions: () => ({ header: null }),
    },
    TeenPatti: { screen: TeenPatti },
    PanjiPakad: { screen: PanjiPakad },
});

export default createAppContainer(AppNavigator);
