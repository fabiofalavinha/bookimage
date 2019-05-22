import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Alert,
    Text,
} from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
    name: t.String,
    email: t.String,
    password: t.String
});

const formStyles = {
    ...Form.stylesheet,
    formGroup: {
      normal: {
        marginBottom: 10
      },
    },
    controlLabel: {
      normal: {
        color: 'blue',
        fontSize: 18,
        marginBottom: 7,
        fontWeight: '600'
      },
      // the style applied when a validation error occours
      error: {
        color: 'red',
        fontSize: 18,
        marginBottom: 7,
        fontWeight: '600'
      }
    }
  }
  
  const options = {
    fields: {
      email: {
        error: 'Without an email address how are you going to reset your password when you forget it?'
      },
      password: {
        error: 'Choose something you use on a dozen other sites or something you won\'t remember',
        secureTextEntry: true
      },
    },
    stylesheet: formStyles,
  };

export default class UserSignUpScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { };
    }

    handleSubmit = () => {
        const value = this._form.getValue();
        console.log(value);

        if (!value) {
            Alert.alert(
                'Warning',
                'All fields are required',
                [
                    { text: 'OK', onPress: () => { }},
                ],
                { cancelable: false },
            );
            return;
        }

        this.setState({ isLoading: true });

        fetch('http://192.168.15.17:8080/public/user', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: value.name,
              email: value.email,
              password: value.password
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ isLoading: false });
            this.navigate('Main');
        })
        .catch((error) =>{
            console.log('Error sign up user: ' + error);
            this.setState({ isLoading: false });

            Alert.alert(
                'ERROR',
                'An error ocurred sign you up: ' + error,
                [
                    { text: 'OK', onPress: () => { }},
                ],
                { cancelable: false },
            );
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>New User</Text>
                <Form 
                    ref={c => this._form = c}
                    type={User} 
                    options={options}
                />
                <TouchableOpacity onPress={this.handleSubmit}>
                    <Text style={styles.button}>Sign up</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        marginBottom: 20,
        fontWeight: 'bold', 
        fontSize: 20,
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
    }
});