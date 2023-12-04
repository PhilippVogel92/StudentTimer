import React, { useState } from "react";
import { View, ScrollView, Text } from "@/components/Themed";
import {onboardingData} from "@/constants/onboardingItems";
import OnboardingCards from "@/components/onboarding/OnboardingCards";
import CardNavigation from "@/components/onboarding/CardNavigation";
import Header from "@/components/Header";
import {Link, router} from "expo-router";
import {StyleSheet} from "react-native";

export default function OnboardingScreen() {
    const [activeIndex, setActiveIndex] = useState(0);

    const navigateToAuthentication = () => {
        router.push("/signup");
    };

    const onPrevPress = () => {
        setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };
    const onNextPress = () => {
        if (activeIndex < onboardingData.length - 1) {
        setActiveIndex((prevIndex) => prevIndex + 1);
        } else {
        navigateToAuthentication();
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <Header title="StudentTimer" />
            </View>
            <OnboardingCards
                onboardingData={onboardingData}
                activeIndex={activeIndex}
            />
            <CardNavigation
                cardAmount={onboardingData.length}
                activeIndex={activeIndex}
                onPrevPress={onPrevPress}
                onNextPress={onNextPress}
            />
            <Text style={{marginTop: 15}}>
              <Link href="/signup" alt="Überspringen zur Registrierung" style={{ textDecorationLine: "underline"}}>
                  Überspringen
              </Link>
            </Text>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 15,
    },
});
