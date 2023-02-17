import React, { Component, useEffect } from 'react'
import { 
    Text, 
    View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API as api} from '../app.json'
import axios from 'axios'

// const WelcomeImage = require('../assets/payment.png')
// const Logo = require('../assets/logo.png');

const Wellcome = (props) => {
    useEffect(() => {
      getDataToken()
    
      return () => {
        
      }
    }, [])
    
    const getDataToken = async () => {
        try {
            const value = await AsyncStorage.getItem('token')
            if(value !== null) {
                cekTokenExpired(value)
            } else {
                props.navigation.push('SignIn')
            }
        } catch(e) {
        }
    }

    const cekTokenExpired = (token) => {
        axios.get(`${api}api/cek-token/`,{
            headers: {
                token: token
            }
        }).then(async (res) => {
            await AsyncStorage.setItem('token', token)
            const user = JSON.stringify(res.data.user)
            await AsyncStorage.setItem('user', user)
            props.navigation.push('Home', {
                user: user,
                token: token
            })
        }).catch(err => {
            if (err.message == 'Network Error') {
                Alert.alert(
                    'Tidak dapat terhubung ke server', 
                    'Periksa jaringan anda',
                    [{ text: "OK", onPress: () => {
                        props.navigation.push('SignIn')
                    }}]
                );
            } else {
                props.navigation.push('SignIn')
            } 
        })
    }
    
    return (
        <View>
            <Text>Wellcome</Text>
        </View>
    )
}

export default Wellcome

