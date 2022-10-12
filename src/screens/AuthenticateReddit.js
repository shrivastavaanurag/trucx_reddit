import React, { Component } from 'react';
import { View, Button, TouchableOpacity, Text, SafeAreaView, StyleSheet } from 'react-native';
import {getData} from "../utils/AsyncStorage";
import {REDDIT_ACCESS_TOKEN} from "../utils/Globals";

export default class AuthenticateReddit extends Component {

    constructor(props){
        super(props);
    }

    async componentDidMount(){
        let token = await getData(REDDIT_ACCESS_TOKEN)
        if (token !== null) {
            this.props.navigation.replace('HomePage')
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>

                    <TouchableOpacity style={styles.button} onPress={() => {
                       this.props.navigation.navigate('Connection', {props: this.props} )
                    }}>
                        <Text style={styles.text}>{'Authenticate with Reddit'}</Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    button: {
        borderRadius: 10, alignSelf: 'center', backgroundColor: '#ffa31a', alignItems: 'center', justifyContent: 'center', padding: 20
    },
    text: {
        fontWeight: 'bold', color: '#ffffff', fontSize: 18
    }
})