import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getTokenByPassword } from '../service/joonikApi';

export const PasswordScreen = ({ navigation }) => {
    const [password, setPassword] = useState('');

    const handleInputChange = (inputTxt) => {
        setPassword(inputTxt);
    };

    const handleOnPress = () => {
        getTokenByPassword(password, 'AVNcGAowXBFpbR08UiceCz13GAMQFmQVC1ltGhERH3NAUwhDWncBA312QGoCflhFdBUJHhNAcEdSB38BAExeZkxDCUcW').then(resp => {
            if(resp.token){
                navigation.navigate('Home');
            }else{
                console.log("Contraseña ingresada incorrecta");
            }
        });
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.emailText}>email@email.com</Text>
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
        fontSize: 16
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
        fontSize: 16
    }
});