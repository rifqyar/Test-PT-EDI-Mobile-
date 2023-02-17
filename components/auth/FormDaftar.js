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
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class FormDaftar extends Component {
    constructor(props){
        super(props);
        
        this.userRef = this.updateRef.bind(this, 'username');
	    this.passRef = this.updateRef.bind(this, 'password');
        this.emailRef = this.updateRef.bind(this, 'email');
        this.onChangeText = this.onChangeText.bind(this)
        this.onFocus = this.onFocus.bind(this)
        this.handleRegisButton = this.handleRegisButton.bind(this)

        this.state = {
            username: null,
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

    onChangeText = (text) => {
        ['email', 'username', 'password']
        .map((name) => ({ name, ref: this[name] }))
        .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
            this.setState({ [name]: text });
        }
        });
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

        ['email', 'username', 'password']
        .forEach((name) => {
            let value = this[name].props.value;

            if (value == null || value == "") {
                errors[name] = `Kolom ${name} Tidak boleh kosong`;
            }
        });

        this.setState({ errors }, function() {
            this.handlePostData()
        });
	}

    handlePostData = () => {
        this.setState({
            showLoading: true
        });

        setTimeout(() => {
            this.props.navigation.push('DataDiri')
        }, 2000);
    }

    render() {
        let { errors = {} } = this.state;
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 3,
                    marginHorizontal: SIZES.padding * 3
                }}>

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
                    onChangeText={this.onChangeText}
			        onFocus={this.onFocus}
			        error={errors.email}
			        ref={this.emailRef}
                    dense
                    left={
                        <TextInput.Icon 
                            name={() => 
                                <Icon 
                                    name={'mail'} 
                                    size={20} 
                                    color={errors.email ? COLORS.Red : COLORS.white} 
                                />
                            }
                        />
                    }
                />
                <HelperText type="error" visible={errors.email ? true : false }>
                    {errors.email}
                </HelperText>
                {/* End email */}

                {/* Username  */}
                <TextInput
                    label="Username"
                    onChangeText={(text) => this.setState({
                        username:text
                    })}
                    underlineColor={COLORS.white}
                    style={{
                        backgroundColor:COLORS.transparent
                    }}
                    theme={this.state.input.theme}
                    value={this.state.username}
                    onChangeText={this.onChangeText}
			        onFocus={this.onFocus}
			        error={errors.username}
			        ref={this.userRef}
                    dense
                    left={
                        <TextInput.Icon 
                            name={() => 
                                <Icon 
                                    name={'person'} 
                                    size={20} 
                                    color={errors.username ? COLORS.Red : COLORS.white} 
                                />
                            }
                        />
                    }
                />
                <HelperText type="error" visible={errors.username ? true : false }>
                    {errors.username}
                </HelperText>
                {/* End username */}
                  
                {/* Password */}
                <TextInput
                    label="Password"
                    underlineColor={COLORS.white}
                    style={{
                        backgroundColor:COLORS.transparent,
                    }}
                    theme={this.state.input.theme}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={this.onChangeText}
			        onFocus={this.onFocus}
			        error={errors.password}
			        ref={this.passRef}
                    dense
                    left={
                        <TextInput.Icon 
                            name={() => 
                                <Icon 
                                    name={'lock'} 
                                    size={20} 
                                    color={errors.password ? COLORS.Red : COLORS.white} 
                                />
                            }
                        />
                    } 
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
                    Lanjutkan
                </Button>
            </View>
        )
    }
}
