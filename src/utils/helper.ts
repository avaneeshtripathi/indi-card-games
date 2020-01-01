import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { TNavigation } from '@types';

const alert = (
    title: string,
    message: string,
    buttons: object[] = [{ text: 'OK' }],
    options: object = { cancelable: false },
) => {
    Alert.alert(title, message, buttons, options);
};

const pushToRoute = (navigation: TNavigation, routeName: string, params?: object) => {
    if (!navigation || !routeName) return;
    const navData = params ? { routeName, params } : { routeName };
    navigation.reset([NavigationActions.navigate(navData)], 0);
};

export default {
    alert,
    pushToRoute,
};
