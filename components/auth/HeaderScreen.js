import React, { Component } from 'react'
import { 
    Alert,
    TouchableOpacity,
    BackHandler
} from 'react-native'

import {
    Text,
} from 'react-native-paper'
import { COLORS, SIZES } from '../../constants/theme'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class HeaderScreen extends Component {
    handleBackButton = () => {
        Alert.alert("Hold on!", "Are you sure you want to exit app?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
          ]);
        return true;
    }
    render() {
        return (
            <TouchableOpacity 
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: SIZES.padding * 6,
                    paddingHorizontal: SIZES.padding * 2,
                }}
                onPress={() => this.handleBackButton()}
            >
                <Icon 
                    name="chevron-left" 
                    size={SIZES.h4} 
                    color={COLORS.black}
                />

                <Text
                    style={{
                        fontSize:SIZES.h1 /2,
                        marginLeft:SIZES.padding * 1,
                        color:COLORS.black,
                    }}
                >
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        )
    }
}
