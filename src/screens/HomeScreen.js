import React from 'react';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { getPostsWithToken } from '../service/joonikApi';

export const HomeScreen = ({route}) => {
    useEffect(() => {
        getPostsWithToken(route.params.token).then(resp => console.log(resp));
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>HomeScreen</Text>
        </View>
    );
};