import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlay, faPause, faRedo } from '@fortawesome/free-solid-svg-icons';

class StopWatch extends Component {
    state = {
        isRunning: false,
        time: 0,
    };

    timerInterval: any;

    handlePlayPause = () => {
        if (this.state.isRunning) {
            clearInterval(this.timerInterval);
        } else {
            this.timerInterval = setInterval(() => {
                this.setState({ time: this.state.time + 1 });
            }, 1000);
        }
        this.setState({ isRunning: !this.state.isRunning });
    };

    handleReset = () => {
        clearInterval(this.timerInterval);
        this.setState({ isRunning: false, time: 0 });
    };

    formatTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    //ToDo: Icon Switch bei Play/Pause
    render() {
        return (
            <View>
                <Text>{this.formatTime(this.state.time)}</Text>
                <TouchableOpacity onPress={this.handlePlayPause}>
                    <Text>Play/Pause-Button</Text>

                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleReset}>
                    <Text>Reset-Button</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default StopWatch;
