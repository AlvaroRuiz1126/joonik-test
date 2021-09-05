import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { getTokenByPassword } from '../service/joonikApi';

export const PasswordScreen = ({ navigation, route }) => {
    const [password, setPassword] = useState('');

    const handleInputChange = (inputTxt) => {
        setPassword(inputTxt);
    };

    const handleOnPress = () => {
        getTokenByPassword(password, route.params.bearerToken).then(resp => {
            if(resp.token){
                navigation.navigate('Home', {
                    name: resp.name,
                    token: resp.token
                });
                //setPassword('');
            }else{
                ToastAndroid.show('Contraseña ingresada incorrecta', ToastAndroid.LONG);
            }
        });
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.emailText}>{route.params.email}</Text>
            <Text style={styles.text}>Password</Text>
            <TextInput
                secureTextEntry={true}
                style={styles.input} 
                value={password} 
                onChangeText={handleInputChange}
            />
            <TouchableOpacity
                onPress={handleOnPress}
                style={styles.button}
                activeOpacity={0.8}
            >
                <Text style={styles.btnText}>Sign in</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    emailText: {
        color: '#707070',
        fontWeight: 'bold',
        fontSize: 16
    },
    text: {
        marginTop: 30,
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