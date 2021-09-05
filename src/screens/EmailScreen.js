import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { getTokenByEmail } from '../service/joonikApi';

export const EmailScreen = ({navigation} ) => {
    const [email, setEmail] = useState('');

    const handleInputChange = (inputTxt) => {
        setEmail(inputTxt);
    };

    const handleOnPress = () => {
        getTokenByEmail(email).then(resp => {
            if(resp.result){
                navigation.navigate('Password', {
                    email,
                    bearerToken: resp.result
                });
                //setEmail('');
            }else{
                ToastAndroid.show('Email ingresado incorrecto', ToastAndroid.LONG);
            }
        });
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.text}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={handleInputChange}
                keyboardType={'email-address'}
            />
            <TouchableOpacity
                onPress={handleOnPress}
                style={styles.button}
                activeOpacity={0.8}
            >
                <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#707070',
        fontWeight: 'bold',
        fontSize: 16,
        textTransform: 'uppercase'
    },
    input: {
        height: 40,
        margin: 12,
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        width: 300,
        borderColor: '#ACACAC'
    },
    button: {
        borderRadius: 20,
        backgroundColor: '#888888',
        width: 150,
        alignItems: 'center',
        padding: 10,
    },
    btnText: {
        color: '#FFFFFF',
        fontSize: 16,
        textTransform: 'uppercase'
    }
});