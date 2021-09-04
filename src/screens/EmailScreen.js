import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export const EmailScreen = ({navigation} ) => {
    const handleOnPress = () => {
        navigation.navigate('Password');
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.text}>EMAIL</Text>
            <TextInput style={styles.input} />
            <TouchableOpacity
                onPress={handleOnPress}
                style={styles.button}
                activeOpacity={0.8}
            >
                <Text style={styles.btnText}>NEXT</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
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