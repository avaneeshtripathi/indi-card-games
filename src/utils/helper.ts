import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

const alert = (
    title: string,
    message: string,
    buttons: object[] = [{ text: 'OK' }],
    options: object = { cancelable: false },
) => {
    Alert.alert(title, message, buttons, options);
};

const pushToRoute = (navigation, routeName, params) => {
    if (!navigation || !routeName) return;
    const navData = params ? { routeName, params } : { routeName };
    navigation.reset([NavigationActions.navigate(navData)], 0);
};

export default {
    alert,
    pushToRoute,
};
