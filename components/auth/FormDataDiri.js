import React, { Component, useState, useEffect } from 'react'
import { 
    View,
    TextInput,
    StyleSheet,
    Alert
} from 'react-native'

import {  
    Button,
} from 'react-native-paper'
import { SIZES, COLORS } from '../../constants/theme'
import {API as api} from '../../app.json'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const regexForNames = /^[a-zA-Z]{2,25}$/
const regexForAge = /[0-9]/g
const singup = {
    field: [
        {
          displayName: 'Nama',
          type: 'ascii-capable',
          editable: true,
          regex: regexForNames,
          key: 'name',
          placeholder: 'Nama',
          inputMode: 'text'
        },
        {
          displayName: 'Email',
          type: 'ascii-capable',
          editable: true,
          regex: regexForNames,
          key: 'email',
          placeholder: 'Email',
          autoCapitalize: 'none',
          inputMode: 'text'
        },
        {
          displayName: 'No. KTP',
          type: 'ascii-capable',
          editable: true,
          regex: regexForAge,
          key: 'no_ktp',
          placeholder: 'No. KTP',
          inputMode: 'numeric'
        },
        {
          displayName: 'Tempat, Tanggal Lahir',
          type: 'email-address',
          editable: true,
          regex: regexForNames,
          key: 'ttl',
          placeholder: 'TTL',
          inputMode: 'text'
        },
        {
          displayName: 'Jenis Kelamin',
          type: 'default',
          editable: true,
          regex: regexForNames,
          key: 'jk',
          placeholder: 'Jenis Kelamin',
          inputMode: 'text'
        },
        {
          displayName: 'Agama',
          type: 'default',
          editable: true,
          regex: regexForNames,
          key: 'agama',
          placeholder: 'Agama',
          inputMode: 'text'
        },
        {
          displayName: 'Gol. Darah',
          type: 'default',
          editable: true,
          regex: regexForNames,
          key: 'gol_darah',
          placeholder: 'Gol. Darah',
          inputMode: 'text'
        },
        {
          displayName: 'Alamat',
          type: 'default',
          editable: true,
          key: 'alamat',
          placeholder: 'Alamat',
          inputMode: 'text'
        },
        {
          displayName: 'No. Telp',
          type: 'default',
          editable: true,
          key: 'no_telp',
          placeholder: 'No. Telp',
          inputMode: 'numeric'
        }
    ],
} 

const FormDataDiri = (props) => {
    const [inputFields, setInputFields] = useState({})
    const [defaultValue, setDefaultValue] = useState({})
    const [showLoading, setshowLoading] = useState(false)

    useEffect(() => {
      setInputValue()
    })

    const cekTokenExpired = (token) => {
        axios.get(`${api}api/cek-token/`,{
            headers: {
                token: token
            }
        }).then(async (res) => {
            await AsyncStorage.setItem('token', token)
            const user = JSON.stringify(res.data.user)
            await AsyncStorage.setItem('user', user)
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
    
    const onChangeInputFields = (text, key) => {
        setInputFields(prevFields => ({
          ...prevFields,
          [key]: text != '' ? text : '',
        }))
    }

    const setInputValue = () => {
        let karyawan = props.karyawan
        if(karyawan != null){
            karyawan.forEach(element => {
                if(element.id_user == props.user.id){
                    element.name = element.nama
                    element.email = element.user.email
                    setDefaultValue(element)
                }
            });
        }
    }

    const handleUpdateProfile = () => {
        setshowLoading(true)
        var canSave = true
        var data = inputFields
        data.role = 0

        Object.entries(inputFields).map(val => {
            if(val[1] == ''){
                canSave = false
            } else {
                canSave = true
            }
        })

        if (!data.name){
            data.name = defaultValue.name
        }

        if (!data.email){
            data.email = defaultValue.email
        } 
        
        cekTokenExpired(props.token)

        if(canSave == true){
            axios.post(`${api}api/user/update/${props.user.id}`,inputFields, {
                headers: {
                    token: props.token,
                    update_karyawan: true
                }
            }).then(async (res) => {
                setshowLoading(false)
                
                const user = JSON.stringify(res.data.data)
                await AsyncStorage.setItem('user', user)

                props.navigation.push('Home', {
                    user: JSON.stringify(res.data.data),
                    token: props.token
                })
            }).catch(err => {
                setshowLoading(false)
                console.log(err)
                if (err.message == 'Network Error') {
                    Alert.alert(
                        'Tidak dapat terhubung ke server', 
                        'Periksa jaringan anda'
                    );
                } else {
                    setshowLoading(false)
                }
            })
        }
    }

    const renderInputField = (field, index) => {
        return (
            <TextInput
                key={index?.toString()}
                style={styles.InputContainer}
                placeholder={field.placeholder}
                placeholderTextColor="#aaaaaa"
                secureTextEntry={field.secureTextEntry}
                onChangeText={text => onChangeInputFields(text, field.key)}
                value={inputFields[field.key] != null ? inputFields[field.key] : defaultValue[field.key]}
                keyboardType={field.type}
                underlineColorAndroid="transparent"
                inputMode={field.inputMode}
                autoCapitalize={field.autoCapitalize}
            />
        )
    }
    return (
        <View style={{flex: 1, marginTop: SIZES.padding}}>
            {singup.field.map(renderInputField)}

            <Button
                mode="contained"
                dark
                style={{
                    marginTop:SIZES.padding3,
                    borderRadius: SIZES.largeTitle
                }}
                contentStyle={{
                    paddingVertical: SIZES.padding
                }}
                loading={showLoading}
                onPress={handleUpdateProfile}>
                Update Data Diri
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    InputContainer: {
        borderWidth: 1,
        borderColor: COLORS.lightGrey,
        backgroundColor: COLORS.transparent,
        color: COLORS.black,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 25,
        fontSize: SIZES.h5
      },
})

export default FormDataDiri
