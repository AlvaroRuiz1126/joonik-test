import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getPostsWithToken } from '../service/joonikApi';

export const HomeScreen = ({navigation, route}) => {
    const [posts, setPosts] = useState([]);
    const [viewLogout, setViewLogout] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleOnPress = () => {
        setViewLogout(!viewLogout);
    };

    const handleLogout = () => {
        navigation.navigate('Email');
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    useEffect(() => {
        getPostsWithToken(route.params.token).then(resp => setPosts(resp));
    }, []);

    //console.log(posts);

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
            <TouchableOpacity style={styles.usernameBtn} onPress={handleOnPress} activeOpacity={1}>
                <View>
                    <Text style={styles.username}>{route.params.name}</Text>
                </View>
                {viewLogout && 
                    <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                        <Text style={styles.logoutTxt}>Logout</Text>
                    </TouchableOpacity>
                }
            </TouchableOpacity>
            <Modal
                animationType='slide'
                transparent={true}
                visible={openModal}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: "white",
                        borderRadius: 20,
                        padding: 35,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5
                    }}>
                        <Pressable style={{ elevation: 2 }} onPress={() => setOpenModal(false)}>
                            <Text>Hello Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {(posts.length > 0)
                ? posts.map((post, idx) => 
                    <View key={idx}>
                        <TouchableOpacity style={styles.btn} activeOpacity={1}>
                            <View>
                                <Image style={styles.img} source={{ uri: post.image }} />
                            </View>

                            <View>
                                <Text style={styles.title}>{post.title}</Text>
                                <Text style={styles.content}>{post.content}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
                : <Text>No hay posts por visualizar</Text>
            }
            <TouchableOpacity style={styles.addBtn} onPress={handleOpenModal}>
                <Text style={styles.txtAddBtn}>Add New</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    usernameBtn: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 10
    },
    username: {
        fontSize: 16,
        color: '#707070',
        fontWeight: 'bold'
    },
    logoutBtn: {
        borderWidth: 1,
        borderColor: '#707070',
        padding: 5,
        width: 100,
        marginTop: 10,
        borderRadius: 10
    },
    logoutTxt: {
        fontSize: 14,
        color: '#707070'
    },
    img: {
        height: 76,
        width: 79
    },
    btn: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#ACACAC',
        padding: 10,
        flexDirection: 'column'
    },
    title: {
        fontSize: 21,
        color: '#707070',
        fontWeight: 'bold'
    },
    content: {
        color: '#707070',
        fontSize: 16
    },
    addBtn: {
        position: 'absolute',
        bottom: 50,
        backgroundColor: '#888888',
        borderRadius: 20,
        width: 150,
        padding: 10 
    },
    txtAddBtn: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 16,
        textTransform: 'uppercase'
    }
});