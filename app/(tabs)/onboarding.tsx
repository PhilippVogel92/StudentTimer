import { StyleSheet } from 'react-native';
import StopWatch from '../../components/timer/stopwatch';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import OnboardingScreen from '../../components/onboarding/onboardingscreen';

export default function Onboarding() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Onboarding</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={styles.timer}>
                <OnboardingScreen />
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    timer: {
        backgroundColor: 'white'
    }
});
