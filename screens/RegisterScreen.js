import React from 'react';
import {
    AsyncStorage,
    Image,
    Button,
    Platform,
    ScrollView,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';

class RegisterScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password1: '',
            password2: '',
            email: '',
        }
    }

    static navigationOptions = {
      title: 'Please register',
    };
  
    render() {
      return (
        <View style={styles.container}>
            
            <TextInput
            style={styles.input}
            placeholder="Enter Username"
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            />
            <TextInput
            style={styles.input}
            placeholder="Enter Password"
            onChangeText={(password1) => this.setState({password1})}
            value={this.state.password1}
            />
            <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={(password2) => this.setState({password2})}
            value={this.state.password2}
            />
            <TextInput
            style={styles.input}
            placeholder="Enter Email"
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            />

            <View style={styles.buttonRow}>
                <View style={{flex:1, marginRight: 10}}>
                    <Button title="Create Account" onPress={this._createAccountAsync} />
                </View>
                <View style={{flex:1}}>
                    <Button title="Back" onPress={this._signIn} />
                </View>
            </View>

        </View>
      );
    }

    _createAccountAsync = async () => {
        let user = {
            'username': this.state.username, 
            'email':this.state.email, 
            'password1': this.state.password1,
            'password2': this.state.password2,
            };

        console.log(user);

        let url = 'https://oasis-notes.herokuapp.com/rest-auth/registration/'

        try {
            const response = await fetch(url, {
              method: 'POST',
              body: JSON.stringify(user),
              headers: {
                'Content-Type': 'application/json'
              }
            });
            const json = await response.json();
            await AsyncStorage.setItem('userToken', json.key);
            this.props.navigation.navigate('Main');
          } catch (error) {
            console.error('Error:', error);
          }

    };

    _signIn = () => {
        this.props.navigation.navigate('SignIn');
    }

    
  }

  let { height, width } = Dimensions.get('window');


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    input: {
        height: 80,
        width: width,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        alignSelf: 'center',

    },
    buttonRow: {
        flexDirection: 'row',
        backgroundColor: 'skyblue',
        height: 80,
        color: '#fff',
        width: width,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
  });


export default RegisterScreen;