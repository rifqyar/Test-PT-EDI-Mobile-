import React, { Component } from 'react'
import { 
    StyleSheet,
    Animated,
    ActivityIndicator
} from 'react-native'

import { COLORS, SIZES } from '../constants/theme';

export default class LoadingScreen extends Component {
    state = {
        showLoading : false,
        fadeAnim: new Animated.Value(0)
    }

    componentDidMount(){
        Animated.timing(this.state.fadeAnim, {
            toValue: 2,
            duration: 500,
            useNativeDriver: true
        }).start();

        this.setState({
            showLoading: true
        });
    }

    render() {
        return (
            <Animated.View style={[
                styles.loading,{
                    opacity: this.state.fadeAnim
                }
            ]}>
                <ActivityIndicator 
                    color={COLORS.secondary} 
                    size={SIZES.width/8} /> 
            </Animated.View> 
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)'
    }
})
