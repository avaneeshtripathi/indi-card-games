import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Touchable from '@components/touchable';
import Theme from '@config/theme';
import Helper from '@utils/helper';
import Images from '@assets/images';
import { TNavigation } from '@types';

const styles = StyleSheet.create({
    headerActionCtr: {
        padding: 20,
    },
    hamburgerIcon: {
        height: 18,
        width: 20,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrowBackIcon: {
        height: 16,
        width: 16,
    },
    leftTitleLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: Theme.colors.text.primary,
    },
    headerTitle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitleText: {
        color: Theme.colors.text.secondary,
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    updateIndicator: {
        position: 'absolute',
        top: -4,
        right: -38,
        height: 12,
        backgroundColor: Theme.colors.screen.primary,
        borderRadius: 8,
        paddingLeft: 4,
        paddingRight: 4,
    },
    updateIndicatorText: {
        color: '#fff',
        fontSize: 10,
        lineHeight: 12,
    },
    theForceLabel: {
        fontWeight: '700',
        fontSize: 15,
    },
    version: {
        color: 'gray',
        fontWeight: '700',
        fontSize: 15,
    },
    headerRight: {
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerRightLabel: {
        color: Theme.colors.text.primary,
        fontSize: Theme.fonts.sizes.xsmall,
    },
    userInfoWrapper: {
        flexDirection: 'column',
    },
    userInfoLabel: {
        textAlign: 'right',
    },
    headerVersionText: {
        position: 'absolute',
        right: 30,
        top: 26,
        fontSize: 10,
        color: Theme.colors.text.secondary,
    },
});

export default (navigation: TNavigation) => {
    const handleLogoClick = () => {
        Helper.alert('Warning', 'This will reset any game in progress', [
            { text: 'Cancel' },
            {
                text: 'Proceed',
                onPress: () => Helper.pushToRoute(navigation, 'Home'),
            },
        ]);
    };

    return {
        headerLeft: <View />,
        headerTitle: (
            <Touchable traits={{ accessibilityRole: 'button' }} onPress={handleLogoClick}>
                <View style={styles.headerTitle}>
                    <ImageBackground
                        source={Images.logo}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                        }}
                        resizeMode="center"
                        imageStyle={{ height: 40 }}
                    >
                        <Text style={styles.headerTitleText}>GAMING ARENA</Text>
                    </ImageBackground>
                </View>
            </Touchable>
        ),
        headerRight: <View />,
        headerStyle: {
            backgroundColor: Theme.colors.screen.blue,
            paddingTop: 10,
            paddingBottom: 10,
            elevate: 6,
        },
    };
};
