import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
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

class CountdownTimer extends Component {
    state = {
        isRunning: false,
        isCountingDown: false,
        time: 0,
        initialTime: 0,
        inputTime: '00:00:00',
    };

    timerInterval: any;

    handlePlayPause = () => {
        if (this.state.isRunning) {
            clearInterval(this.timerInterval);
        } else {
            this.timerInterval = setInterval(() => {
                this.setState({ time: this.state.time - 1 });
                if (this.state.time < 0) {
                    clearInterval(this.timerInterval);
                }
            }, 1000);
        }
        this.setState({ isRunning: !this.state.isRunning });
    };

    handleReset = () => {
        clearInterval(this.timerInterval);
        this.setState({
            isRunning: false,
            time: this.state.initialTime,
            isCountingDown: false,
            inputTime: this.formatTime(this.state.initialTime),
        });
    };

    handleStartCountdown = () => {
        const inputTimeArray = this.state.inputTime.split(':');
        const hours = parseInt(inputTimeArray[0], 10);
        const minutes = parseInt(inputTimeArray[1], 10);
        const seconds = parseInt(inputTimeArray[2], 10);
        const totalTime = hours * 3600 + minutes * 60 + seconds;
        this.setState({ time: totalTime, initialTime: totalTime, isCountingDown: true });
    };

    formatTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.isCountingDown ? (
                    <>
                        <Text style={styles.time}>{this.formatTime(this.state.time)}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={this.handlePlayPause}>
                                <TimerIcon name={this.state.isRunning ? 'pause-circle-o' : 'play-circle-o'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={this.handleReset}>
                                <TimerIcon name='refresh' />
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="hh:mm:ss"
                            onChangeText={(text) => this.setState({ inputTime: text })}
                            value={this.state.inputTime}
                        />
                        <TouchableOpacity style={styles.startButton} onPress={this.handleStartCountdown}>
                            <Text>Set Timer</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    time: {
        fontSize: 24,
        marginBottom: 10,
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
    input: {
        width: 150,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
    },
    startButton: {
        backgroundColor: 'lightgray',
        borderColor: 'lightseagreen',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
    },
});

export default CountdownTimer;
