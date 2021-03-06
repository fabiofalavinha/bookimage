import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    View,
    Button,
  } from 'react-native';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { version: '1.0.0' };
    }

    onSignIn = () => {
        console.log('log in');
        this.setState({ loading: true, version: '1.0.0' });
    }

    openSignUpScreen = () => {
        this.props.navigation.navigate('SignUp');
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Welcome to Bookimage!</Text>
                    <View style={styles.lineSeparator} />
                    <Text style={styles.description}>Your bookmark image app</Text>
                </View>
                <View style={styles.singInContainer}>
                    <TextInput style={styles.username} placeholder='Username' textContentType='username' autoCapitalize='none' autoFocus />
                    <View style={styles.lineSeparator} />
                    <TextInput style={styles.password} placeholder='Password' textContentType='password' secureTextEntry />
                    <View style={styles.lineSeparator} />
                    <TouchableOpacity onPress={this.onSignIn}>
                        <Text style={styles.button}>Log in</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signUpContainer}>
                    <Button title='New user? Sign up' onPress={this.openSignUpScreen} />
                </View>
                <View style={styles.version}>
                    <Text>v{this.state.version}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DEE2EC',
    },
    titleContainer: {
        padding: 20,
    },
    title: {
        fontWeight: 'bold', 
        fontSize: 20,
    },
    description: {
        fontStyle: 'italic',
        fontSize: 12,
    },
    lineSeparator: {
        padding: 5
    },
    singInContainer: {
        justifyContent: 'center',
        padding: 20,
    },
    separator: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    signUpContainer: {
        justifyContent: 'center',
        padding: 20,
        alignContent: 'center',
    },
    username: {
        padding: 3,
        borderColor: 'gray', 
        borderWidth: 1,
        height: 40
    },
    password: {
        padding: 3,
        borderColor: 'gray', 
        borderWidth: 1,
        height: 40
    },
    button: {
        backgroundColor: '#406E8E',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 12,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 12,
        textAlign:'center',
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    version: {
        position: 'absolute',
        bottom: 0,
        justifyContent: 'flex-end',
        padding: 20,
    }
});
