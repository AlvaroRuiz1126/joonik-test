import React from 'react';
import { useState, useEffect } from 'react';
import { FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { addNewPost, getPostsWithToken } from '../service/joonikApi';

export const HomeScreen = ({navigation, route}) => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [img, setImg] = useState();
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

    const handleLoadImage = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5
        }, (resp) => {
            if(resp.didCancel) return;
            if(!resp.assets[0].uri) return;

            setImg(resp.assets[0]);
        });
    };

    const handleSubmitForm = () => {
        if(title === '') return ToastAndroid.show('The title is required', ToastAndroid.LONG);
        if(content === '') return ToastAndroid.show('A content for post is required', ToastAndroid.LONG);
        if(!img) return ToastAndroid.show('You must upload an image for post', ToastAndroid.LONG);

        addNewPost(route.params.token, title, content, img)
        .then(resp => {
            if(resp.error){
                return (ToastAndroid.show(resp.error, ToastAndroid.LONG));
            }else{
                setTitle('');
                setContent('');
                setImg();
                setOpenModal(false);

                return (ToastAndroid.show("The Post has been added successfully", ToastAndroid.LONG))
            }
        })
    };

    useEffect(() => {
        getPostsWithToken(route.params.token).then(resp => setPosts(resp));
    }, [openModal]);

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
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Create a new Post</Text>
                        <Text style={styles.modalTxt}>Title</Text>
                        <TextInput style={styles.input} onChangeText={setTitle} />

                        <Text style={styles.modalTxt}>Content</Text>
                        <TextInput style={styles.input} onChangeText={setContent} />

                        <Text style={styles.modalTxt}>Image</Text>
                        <TouchableOpacity style={{backgroundColor: '#888888', width: 80, borderRadius: 20, margin: 12}} activeOpacity={0.7} onPress={handleLoadImage}>
                            <Text style={{textAlign: 'center', padding: 5, color: '#FFFFFF', textTransform: 'uppercase'}}>Galería</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.saveBtn} onPress={handleSubmitForm}>
                            <Text style={styles.content}>Save</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelBtn} onPress={() => setOpenModal(false)}>
                            <Text style={styles.content}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <FlatList
                style={{marginTop: 80}}
                data={posts}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity style={styles.btn} activeOpacity={1}>
                            <View>
                                <Image style={styles.img} source={{ uri: item.image }} />
                            </View>

                            <View>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.content}>{item.content}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={item => item.image}
            />

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
        left: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#707070',
        padding: 5,
        marginTop: 10,
        borderRadius: 10
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
    modalView: {
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
    },
    modalTitle: {
        fontSize: 16,
        marginBottom: 20
    },
    modalTxt: {
        color: '#707070',
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
    saveBtn: {
        position: 'absolute',
        bottom: 20,
        right: 100
    },
    cancelBtn: {
        position: 'absolute',
        bottom: 20,
        left: 100
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
        flexDirection: 'column',
        marginBottom: 10,
        width: 300
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