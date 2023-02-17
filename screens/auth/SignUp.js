import React, {useState} from 'react'
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
import HeaderScreen from '../../components/auth/HeaderScreen'
import LoadingScreen from '../../components/LoadingScreen'
import FormDaftar from '../../components/auth/FormDaftar'

const SignUp = (props) => {
    const [showLoading, setshowLoading] = useState(false)

    const handleNavigate = () => {
        setshowLoading(true)

        setTimeout(() => {
            props.navigation.push('SignIn')    
        }, 1500);
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex:1 }}
        >
            <LinearGradient
                colors={[COLORS.secondary, COLORS.lightGrey]}
                style={{flex: 1}}>
                <HeaderScreen title='Sign Up' />
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Headline style={{textAlign:'center', color: COLORS.black}}>
                        Silahkan Masukan Data diri anda
                    </Headline>
                    <FormDaftar navigation={props.navigation}/>
                    <Text style={{
                            textAlign:'center', 
                            color: COLORS.black, 
                            marginTop:SIZES.padding
                        }}>
                            Sudah punya akun?
                            <Text 
                                onPress={() => handleNavigate(props.navigation)}
                                style={{
                                    color: COLORS.black, 
                                }}> Login disini</Text>
                    </Text>
                </View> 
                
                {
                    showLoading == true 
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

export default SignUp

const styles = StyleSheet.create({})