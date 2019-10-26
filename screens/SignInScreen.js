import React from 'react';
import {
    AsyncStorage,
    ActivityIndicator,
    Image,
    Dimensions,
    Button,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  

class SignInScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
        }
    }
    static navigationOptions = {
      title: 'Please sign in',
    };
  
    render() {
      return (
        <View style={styles.container}>

            <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            />
            <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            />
            <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            />

            <View style={styles.buttonRow}>
                <View style={{flex:1, marginRight: 10}}>
                    <Button title="Sign in" onPress={this._signInAsync} />
                </View>
                <View style={{flex:1}}>
                    <Button title="Register" onPress={this._register} />
                </View>
            </View>
        </View>
      );
    }
  
    _signInAsync = async () => {
        let user = {
            'username': this.state.username, 
            'email':this.state.email, 
            'password': this.state.password
            };

        user = {
            'username': 'colinbowen', 
            'email': 'colinbowen2@gmail.com', 
            'password': 'Activia83948!'
            };

        console.log(user);

        let url = 'https://oasis-notes.herokuapp.com/rest-auth/login/'

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
            // this.props.navigation.navigate('Main');
          } catch (error) {
            console.error('Error:', error);
          }


            url = 'http://oasis-notes.herokuapp.com/rest-auth/user/'
            const userToken = await AsyncStorage.getItem('userToken');
            let token = 'Token ' + userToken;

          try {
            const response_user = await fetch(url, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
              }
            });
            let json_user = await response_user.json();
            await AsyncStorage.setItem('username', json_user.username);
            await AsyncStorage.setItem('email', json_user.email);
            let user_url = 'http://oasis-notes.herokuapp.com/users/' + json_user.pk +'/'
            await AsyncStorage.setItem('user_url', user_url);
            

            this.props.navigation.navigate('Main');
          } catch (error) {
            console.error('Error:', error);
          }


    };

    _register = () => {
        this.props.navigation.navigate('Register');
    }
}

let { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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

export default SignInScreen;