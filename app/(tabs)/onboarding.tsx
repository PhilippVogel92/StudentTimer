import { StyleSheet } from "react-native";


import { Text, View } from "../../components/Themed";
import OnboardingScreen from "../../components/onboarding/onboardingScreen";

export default function TabOnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Onboarding</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.onboarding}>
        <OnboardingScreen />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  onboarding: {
    backgroundColor: 'white'
  }
});
