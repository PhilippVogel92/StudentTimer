import React, { useState, Fragment } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TimerIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const OnboardingScreen = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const onSkipPress = () => {
        //Navigation zur Haupt-App-Seite implementieren
    };

    const onNextPress = () => {
        setActiveIndex((prevIndex) => prevIndex + 1);
    };

    const onPrevPress = () => {
        setActiveIndex((prevIndex) => prevIndex - 1);
    };

    const onboardingData = [
        {
            title: 'Tracking',
            description: 'Tracke ganz einfach deine Lernzeit.',
            image: require('../../assets/images/onboarding/tracking.svg'),
        },
        {
            title: 'Modulverwaltung',
            description: 'Erstelle Module und verwalte sie.',
            image: require('../../assets/images/onboarding/modulverwaltung.svg'),
        },
        {
            title: 'Erfolg',
            description: 'Schaue dir deine Erfolge direkt in der App an.',
            image: require('../../assets/images/onboarding/erfolg.svg')
        },
        {
            title: 'Vergleich',
            description: 'Vergleiche die Arbeitszeit für deine Module.',
            image: require('../../assets/images/onboarding/vergleich.svg'),
        },
    ];

    const renderOnboardingItem = ({ title, description, image }: { title: string, description: string, image: any }) => (
        <View style={styles.onboardingItem}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Image source={image} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text>Hello, I am your Onboarding!</Text>
            {/* Onboarding-Beschreibungs-Daten */}
            {onboardingData.map((item, index) => (
                <Fragment key={index}>
                    {index === activeIndex && renderOnboardingItem(item)}
                </Fragment>
            ))}

            {/* Onboarding-Navigation */}
            <View style={styles.navigation}>
                <TouchableOpacity onPress={onPrevPress}>
                    <Text>{'<'}</Text>
                </TouchableOpacity>

                {/* Punkte für jeden Onboarding-Screen */}
                {onboardingData.map((_, index) => (
                    <Text key={index} style={index === activeIndex ? styles.activeDot : styles.dot}>
                        {' ° '}
                    </Text>
                ))}

                <TouchableOpacity onPress={onNextPress}>
                    <Text>{'>'}</Text>
                </TouchableOpacity>
            </View>
            {/* Überspringen-Button */}
            <TouchableOpacity style={styles.button_customized} onPress={onSkipPress}>
                <Text style={styles.buttontext}>Überspringen</Text>
            </TouchableOpacity>
        </View>

    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'lightgray',
        borderColor: 'lightseagreen',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        margin: 5,
    },
    onboardingItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%',
    },
    dot: {
        fontSize: 24,
        color: '#888',
    },
    activeDot: {
        fontSize: 24,
        color: '#000',
    },
    button_customized: {
        width: 175,
        height: 49.84439468383789,
        borderRadius: 50,
        backgroundColor: "#958AAA",
        padding: 10,
        margin: 5,

    },
    buttontext: {
        textAlign: "center",
        color: "#F6F6F6",
    }

});

