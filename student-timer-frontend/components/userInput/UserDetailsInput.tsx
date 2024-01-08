import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Pressable} from 'react-native';
import InputField from "@/components/InputField";
import { COLORTHEME } from "@/constants/Theme";
import Button from "@/components/Button";

export default function UserDetailsInput(props: {
    userName: string;
    setUserName: (value: string) => void;
    nameError: string;
    userStudyCourse: string;
    setUserStudyCourse: (value: string) => void;
    studyCourseError: string;
    userEmail: string;
    setUserEmail: (value: string) => void;
    emailError: string;
    buttonAction: (value: string) => void;
    cancelAction: (value: string) => void;
}) {
    const {
        userName, setUserName, nameError,
        userStudyCourse, setUserStudyCourse, studyCourseError,
        userEmail, setUserEmail, emailError,
        buttonAction,
        cancelAction,
    } = props;

    return (
        <>
            <View style={styles.container}>
                <View style={styles.outerWrapper}>
                    <View style={styles.row}>
                        <InputField
                            label="Name"
                            value={userName}
                            onChangeText={setUserName}
                            message={nameError}
                            messageColor="red"
                        />
                        <InputField
                            label="Studienfach"
                            onChangeText={setUserStudyCourse}
                            value={userStudyCourse}
                            message={studyCourseError}
                            messageColor="red"
                        />
                    </View>
                    <View style={styles.row}>
                        <InputField
                            label="E-Mail"
                            onChangeText={setUserEmail}
                            value={userEmail}
                            keyboardType="email-address"
                            message={emailError}
                            messageColor="red"
                        />
                    </View>
                </View>
                <Button
                    text="Speichern"
                    backgroundColor={COLORTHEME.light.primary}
                    textColor={COLORTHEME.light.grey2}
                    onPress={buttonAction}
                    style={{ width: 200 }}
                />
                <Button
                    text="Abbrechen"
                    backgroundColor={'transparent'}
                    textColor={COLORTHEME.light.text}
                    onPress={cancelAction}
                    style={{ width: 200 }}
                />
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 12,
        gap: 10,
    },
    outerWrapper: {
        width: "100%",
        backgroundColor: COLORTHEME.light.grey1,
        borderRadius: 12,
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 24,
        gap: 5,
    },
    row: {
        flexGrow: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        gap: 16,
    },
    inputLabelGroup: {
        flex: 1,
        gap: 5,
        flexDirection: "column",
        backgroundColor: "transparent",
    },
    inputLabelText: {
        color: COLORTHEME.light.primary,
    },
    input: {
        flexGrow: 1,
        backgroundColor: COLORTHEME.light.grey2,
        color: COLORTHEME.light.grey3,
        borderRadius: 12,
        height: 40,
        paddingHorizontal: 10,
    },
    buttons: {
        flexDirection: "column",
        alignItems: "center",
        gap: 15,
    },
    errorMessage: {
        color: "red",
        fontSize: 14,
        textAlign: "center",
        width: "100%",
    },
});
