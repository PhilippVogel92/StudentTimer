import { StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import OnboardingScreen from "../../components/onboarding/onboardingScreen";

export default function TabFourScreen() {
    return (
        <View style={styles.container}>
            <OnboardingScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

});
