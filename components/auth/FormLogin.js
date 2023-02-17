import React, { Component } from 'react'
import { 
    View,
    TouchableOpacity,
    Alert
} from 'react-native'

import {
    Button,
    TextInput,
    HelperText,
    Text,
} from 'react-native-paper'

import { COLORS, SIZES } from '../../constants/theme'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {API as api} from '../../app.json'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class FormLogin extends Component {
    constructor(props){
        super(props);
        
        this.emailRef = this.updateRef.bind(this, 'email');
	    this.passRef = this.updateRef.bind(this, 'password');
        this.onFocus = this.onFocus.bind(this)
        this.handleLoginButton = this.handleLoginButton.bind(this)

        this.state = {
            email: null,
            password: null,
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

    
	handleLoginButton = () => {
		let errors = {};
        let next = true;

        ['email', 'password']
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

    handlePostData = async () => {
        this.setState({
            showLoading: true
        });
        axios.post(`${api}api/login`,{
            email: this.state.email,
            password: this.state.password,
        }).then(res => {
            AsyncStorage.setItem('token', res.data.token)
            AsyncStorage.setItem('user', JSON.stringify(res.data.user))
            this.setState({
                showLoading: false
            });

            this.props.navigation.push('Home', {
                user: JSON.stringify(res.data.user),
                token: res.data.token
            })
        }).catch(err => {
            console.log(err)
            if (err.message == 'Network Error') {
                Alert.alert(
                    'Tidak dapat terhubung ke server', 
                    'Periksa jaringan anda',
                    [{ text: "OK", onPress: () => {
                        this.props.navigation.push('SignIn')
                    }}]
                );
            } else {
                Alert.alert(
                    'Login gagal!', 
                    'email atau password salah',
                );

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
                    marginHorizontal: SIZES.padding * 3,
                }}
            >
                <TextInput
                    label="Email"
                    onChangeText={(text) => this.setState({
                        email:text
                    })}
                    placeholder="Masukan email Anda"
                    underlineColor={COLORS.Grey}
                    style={{
                        backgroundColor:COLORS.transparent,
                    }}
                    textColor={COLORS.black}
                    placeholderTextColor={COLORS.black}
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
                  
                <TextInput
                    label="Password"
                    placeholder="*******"
                    underlineColor={COLORS.Grey}
                    style={{
                        backgroundColor:COLORS.transparent,
                    }}
                    theme={this.state.input.theme}
                    textColor={COLORS.black}
                    placeholderTextColor={COLORS.black}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({
                        password:text
                    })}
			        onFocus={this.onFocus}
			        error={errors.password}
			        ref={this.passRef} 
                    dense
                    left={<TextInput.Icon icon="key"/>} 
                />
                <HelperText type="error" visible={errors.password ? true : false }>
                    {errors.password}
                </HelperText>

                <Button
                loading={this.state.showLoading}
                mode="contained"
                dark
                icon="login"
                style={{
                    marginTop:SIZES.padding3,
                    borderRadius: SIZES.largeTitle,
                }}
                contentStyle={{
                    paddingVertical: SIZES.padding
                }}
                color={COLORS.blackLighten2}
                onPress={() => this.handleLoginButton()}>
                    Login Sekarang
                </Button>
                
            </View>
        )
    }
}

// const FormLogin = (props) => {
//   return (
//     <View
//         style={{
//             marginTop: SIZES.padding * 3,
//             marginHorizontal: SIZES.padding * 3,
//         }}
//     >
//         <TextInput
//             label="Email"
//             onChangeText={(text) => this.setState({
//                 email:text
//             })}
//             placeholder="Masukan email Anda"
//             underlineColor={COLORS.white}
//             style={{
//                 backgroundColor:COLORS.transparent,
//             }}
//             textColor={COLORS.lightGrey}
//             placeholderTextColor={COLORS.Grey}
//             theme={this.state.input.theme}
//             value={this.state.email}
//             onFocus={this.onFocus}
//             error={errors.email}
//             ref={this.userRef} 
//             dense
//             left={
//                 <TextInput.Icon name={() => <Icon name={'person'} size={20} color={COLORS.white}/>}/>
//             }
//         />
//         <HelperText type="error" visible={errors.email ? true : false }>
//             {errors.email}
//         </HelperText>
            
//         <TextInput
//             label="Password"
//             placeholder="*******"
//             underlineColor={COLORS.white}
//             style={{
//                 backgroundColor:COLORS.transparent,
//             }}
//             theme={this.state.input.theme}
//             textColor={COLORS.lightGrey}
//             placeholderTextColor={COLORS.Grey}
//             secureTextEntry={true}
//             value={this.state.password}
//             onChangeText={this.onChangeText}
//             onFocus={this.onFocus}
//             error={errors.password}
//             ref={this.passRef} 
//             dense
//             left={
//                 <TextInput.Icon name={() => <Icon name={'vpn-key'} size={20} color={COLORS.white} />}/>
//             }
//         />
//         <HelperText type="error" visible={errors.password ? true : false }>
//             {errors.password}
//         </HelperText>

//         <Button
//         loading={this.state.showLoading}
//         mode="contained"
//         dark
//         icon="login"
//         style={{
//             marginTop:SIZES.padding3,
//             borderRadius: SIZES.largeTitle,
//         }}
//         contentStyle={{
//             paddingVertical: SIZES.padding
//         }}
//         color={COLORS.blackLighten2}
//         onPress={() => this.handleLoginButton()}>
//             Login Sekarang
//         </Button>
        
//     </View>
//   )
// }

// export default FormLogin
