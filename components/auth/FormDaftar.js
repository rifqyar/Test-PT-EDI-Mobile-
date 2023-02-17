import React, { Component } from 'react'
import { 
    View,
} from 'react-native'

import {
    Button,
    TextInput,
    HelperText,
} from 'react-native-paper'

import { COLORS, SIZES } from '../../constants/theme'
import {API as api} from '../../app.json'
import axios from 'axios'

export default class FormDaftar extends Component {
    constructor(props){
        super(props);
        
        this.userRef = this.updateRef.bind(this, 'nama');
	    this.passRef = this.updateRef.bind(this, 'password');
        this.emailRef = this.updateRef.bind(this, 'email');
        this.onFocus = this.onFocus.bind(this)
        this.handleRegisButton = this.handleRegisButton.bind(this)

        this.state = {
            nama: null,
            password: null,
            email: null,
            input: {
                theme: {
                    colors: {
                        placeholder: COLORS.white,
                        text: COLORS.white
                    },
                }
            },
            showLoading: false,
        }

    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    onFocus() {
        let { errors = {} } = this.state;
    
        for (let name in errors) {
          let ref = this[name];
    
          if (ref && ref.isFocused()) {
            delete errors[name];
          }
        }
    }

    
	handleRegisButton = () => {
		let errors = {};
        let next = true;

        ['nama', 'email', 'password']
        .forEach((name) => {
            let value = this.state[name];

            if (value == null || value == "") {
                errors[name] = `Kolom ${name} Tidak boleh kosong`;
                next = false;
            }
        });

        this.setState({ errors }, function(){
            if (next){
                this.handlePostData()
            }
        });
	}

    handlePostData = () => {
        this.setState({
            showLoading: true
        });

        axios.post(`${api}api/user/store`,{
            name: this.state.nama,
            email: this.state.email,
            password: this.state.password,
            id_role: 0
        }).then(res => {
            this.setState({
                showLoading: false
            });

            this.props.navigation.push('SignIn')
        }).catch(err => {
            if (err.message == 'Network Error') {
                Alert.alert(
                    'Tidak dapat terhubung ke server', 
                    'Periksa jaringan anda'
                );
            } else {
                this.setState({
                    showLoading: false
                });
            }
        })
    }

    render() {
        let { errors = {} } = this.state;
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 3,
                    marginHorizontal: SIZES.padding * 3
                }}>

                {/* Username  */}
                <TextInput
                    label="Nama Lengkap"
                    onChangeText={(text) => this.setState({
                        nama:text
                    })}
                    underlineColor={COLORS.white}
                    style={{
                        backgroundColor:COLORS.transparent
                    }}
                    theme={this.state.input.theme}
                    value={this.state.nama}
			        onFocus={this.onFocus}
			        error={errors.nama}
			        ref={this.userRef}
                    dense
                    left={<TextInput.Icon icon="account-circle"/>} 

                />
                <HelperText type="error" visible={errors.nama ? true : false }>
                    {errors.nama}
                </HelperText>
                {/* End username */}

                {/* Email  */}
                <TextInput
                    label="Email"
                    onChangeText={(text) => this.setState({
                        email:text
                    })}
                    underlineColor={COLORS.white}
                    style={{
                        backgroundColor:COLORS.transparent
                    }}
                    theme={this.state.input.theme}
                    value={this.state.email}
			        onFocus={this.onFocus}
			        error={errors.email}
			        ref={this.emailRef}
                    dense
                    left={<TextInput.Icon icon="email"/>} 
                />
                <HelperText type="error" visible={errors.email ? true : false }>
                    {errors.email}
                </HelperText>
                {/* End email */}
                  
                {/* Password */}
                <TextInput
                    label="Password"
                    onChangeText={(text) => this.setState({
                        password:text
                    })}
                    underlineColor={COLORS.white}
                    style={{
                        backgroundColor:COLORS.transparent,
                    }}
                    theme={this.state.input.theme}
                    secureTextEntry={true}
                    value={this.state.password}
			        onFocus={this.onFocus}
			        error={errors.password}
			        ref={this.passRef}
                    dense
                    left={<TextInput.Icon icon="key"/>} 
                />
                <HelperText type="error" visible={errors.password ? true : false }>
                    {errors.password}
                </HelperText>
                {/* End Password */}

                <Button
                loading={this.state.showLoading}
                mode="contained"
                dark
                style={{
                    marginTop:SIZES.padding3,
                    borderRadius: SIZES.largeTitle
                }}
                contentStyle={{
                    paddingVertical: SIZES.padding
                }}
                color={COLORS.blackLighten2}
                onPress={() => this.handleRegisButton()}>
                    Daftar
                </Button>
            </View>
        )
    }
}
