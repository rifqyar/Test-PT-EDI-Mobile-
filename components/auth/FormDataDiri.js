import React, { Component, useState } from 'react'
import { 
    View,
    TextInput,
    StyleSheet
} from 'react-native'

import {  
    Title,
    Button,
    Card,
    HelperText,
    Caption,
    Subheading
} from 'react-native-paper'
import { SIZES, COLORS } from '../../constants/theme'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const regexForNames = /^[a-zA-Z]{2,25}$/
const regexForAge = /[0-9]/g
const singup = {
    field: [
        {
          displayName: 'Nama',
          type: 'ascii-capable',
          editable: true,
          regex: regexForNames,
          key: 'nama',
          placeholder: 'Nama',
        },
        {
          displayName: 'Email',
          type: 'ascii-capable',
          editable: true,
          regex: regexForNames,
          key: 'email',
          placeholder: 'Email',
          autoCapitalize: 'none',
        },
        {
          displayName: 'No. KTP',
          type: 'ascii-capable',
          editable: true,
          regex: regexForAge,
          key: 'no_ktp',
          placeholder: 'No. KTP',
        },
        {
          displayName: 'Tempat, Tanggal Lahir',
          type: 'email-address',
          editable: true,
          regex: regexForNames,
          key: 'ttl',
          placeholder: 'TTL',
        },
        {
          displayName: 'Jenis Kelamin',
          type: 'default',
          editable: true,
          regex: regexForNames,
          key: 'jk',
          placeholder: 'Jenis Kelamin',
        },
        {
          displayName: 'Agama',
          type: 'default',
          editable: true,
          regex: regexForNames,
          key: 'agama',
          placeholder: 'Agama',
        },
        {
          displayName: 'Gol. Darah',
          type: 'default',
          editable: true,
          regex: regexForNames,
          key: 'gol_darah',
          placeholder: 'Gol. Darah',
        },
        {
          displayName: 'Alamat',
          type: 'default',
          editable: true,
          key: 'alamat',
          placeholder: 'Alamat',
        },
        {
          displayName: 'No. Telp',
          type: 'default',
          editable: true,
          key: 'no_telp',
          placeholder: 'No. Telp',
        }
    ],
} 

const FormDataDiri = () => {
    const [inputFields, setInputFields] = useState({})

    const onChangeInputFields = (text, key) => {
        setInputFields(prevFields => ({
          ...prevFields,
          [key]: text,
        }))
    }

    const renderInputField = (field, index) => {
        return (
            <TextInput
                key={index?.toString()}
                style={styles.inputContainer}
                placeholder={field.placeholder}
                placeholderTextColor="#aaaaaa"
                secureTextEntry={field.secureTextEntry}
                onChangeText={text => onChangeInputFields(text, field.key)}
                value={inputFields[field.key]}
                keyboardType={field.type}
                underlineColorAndroid="transparent"
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
                color={COLORS.blackLighten2}>
                Update Data Diri
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    InputContainer: {
        // height: 42,
        borderWidth: 1,
        borderColor: COLORS.lightGrey,
        backgroundColor: COLORS.transparent,
        paddingLeft: 20,
        color: COLORS.black,
        width: '80%',
        alignSelf: 'center',
        marginTop: 20,
        alignItems: 'center',
        borderRadius: 25,
        fontSize: SIZES.h5
      },
})

export default FormDataDiri
