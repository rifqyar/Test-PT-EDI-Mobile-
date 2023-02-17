import React, { Component } from 'react'
import { 
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    StyleSheet,
    View,
    StatusBar
} from 'react-native'

import { Text, Dialog, Headline } from 'react-native-paper'

import { COLORS, SIZES } from '../../constants/theme'

import LinearGradient from 'react-native-linear-gradient'
import FormLogin from '../../components/auth/FormLogin'
import HeaderScreen from '../../components/auth/HeaderScreen'
import LoadingScreen from '../../components/LoadingScreen'

export default class SignIn extends Component {
    state = {
        showLoading : false,
    }

    handleNavigate = () => {
        this.setState({
            showLoading: true
        });

        setTimeout(() => {
            this.props.navigation.push('SignUp')    
        }, 1500);
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex:1 }}
            >
                <LinearGradient
                    colors={[COLORS.secondary, COLORS.lightGrey]}
                    style={{flex: 1}}>
                    <HeaderScreen title='Sign In' />
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Headline style={{textAlign:'center', color: COLORS.black}}>
                            Harap Login Terebih Dahulu
                        </Headline>
                        <FormLogin navigation={this.props.navigation}/>
                        <Text style={{
                            textAlign:'center', 
                            color: COLORS.black, 
                            marginTop:SIZES.padding
                        }}>
                            Belum punya akun?
                            <Text 
                                onPress={() => this.handleNavigate(this.props.navigation)}
                                style={{
                                    color: COLORS.black, 
                                }}> Daftar disini</Text>
                        </Text>
                    </View> 
                    
                    {
                        this.state.showLoading == true 
                        ? 
                            <LoadingScreen />
                        : 
                            <View />
                    }
                                         
                </LinearGradient>
                <StatusBar barStyle="light-content" backgroundColor="#FF573300" translucent={true}/>
            </KeyboardAvoidingView>
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
