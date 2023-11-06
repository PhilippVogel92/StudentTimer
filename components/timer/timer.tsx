import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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

class Timer extends Component {
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

    render() {
        return (
            <View>
                <Text>{this.formatTime(this.state.time)}</Text>
                <TouchableOpacity onPress={this.handlePlayPause}>
                    <TimerIcon name={this.state.isRunning ? 'pause-circle-o' : 'play-circle-o'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleReset}>
                    <TimerIcon name='refresh' />
                </TouchableOpacity>
            </View>
        );
    }
}


export default Timer;

