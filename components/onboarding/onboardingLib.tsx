import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';

import { Text, View } from "../Themed";
import Colors from "../../constants/Colors";
import { Image } from 'react-native';
import { onboardingData } from './onboardingItems';
import { useNavigation } from '@react-navigation/native';



const OnboardingLib = () => {

    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "(tabs)" as never }] // toDo: das muss irgendwie besser gehen als mit "as never"
        });
    };

    const renderOnboardingPages = () => {
        return onboardingData.map((page, index) => {
            return {
                backgroundColor: Colors.light.background,
                image: <Image source={page.image} />,
                title: page.title,
                subtitle: page.description,
            };
        });
    };

    return (
        <Onboarding
            onSkip={navigateToHome}
            onDone={navigateToHome}
            pages={renderOnboardingPages()}
        />
    );
};

export default OnboardingLib;

