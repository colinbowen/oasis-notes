import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { withNavigation } from 'react-navigation';
import * as Location from 'expo-location';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Permissions from 'expo-permissions';


import {
  AsyncStorage,
  ActivityIndicator,
  Image,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { FlatList } from 'react-native-gesture-handler';


const LOCATION_TASK_NAME = 'background-location-task';


function Item({ title, text, username }) {
  let name;
  url = Object.values({ username }).toString();
  fetch(url)
  .then(response => response.json())
  .then(userResponse => name = userResponse.username)

    return (
      <View style={styles.item}>
        <Text style={styles.text}>{ title }</Text>
        <Text style={styles.text}>{ text }</Text>
      </View>
    )
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      location: null,
      errorMessage: null,
    }
  }



  componentDidMount(){
    return fetch('http://oasis-notes.herokuapp.com/notes/')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson,
      });
    });

  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
      // send location
      this._sendLocationAsync();
    }
  }


  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex:1, padding:20}}>
          <ActivityIndicator />
        </View>
      )
    }

    // location
    let locationCoords = 'Waiting..';
    if (this.state.errorMessage) {
      locationCoords = this.state.errorMessage;
    } else if (this.state.location) {
      locationCoords = this.state.location;
    }

    return (
      <View style={styles.container}>
        <Button title="Refresh Notes" onPress={this._getNotes} />
        <Button title="Send location" onPress={this._sendLocationAsync} />

        <FlatList 
          data={this.state.dataSource}
          renderItem={({item}) => <Item title={item.title} text={item.text} username={item.user} />}
          keyExtractor={item => item.id.toString()}
          
        />

      </View>
    );
  }

  _getUsers = async () => {
    let response = await fetch('http://oasis-notes.herokuapp.com/users/');
    let responseJson = await response.json();
  };

  _getNotes = async () => {
    let response = await fetch('http://oasis-notes.herokuapp.com/notes/');
    let responseJson = await response.json();
    this.setState({
      dataSource: responseJson,
    })
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;
    this.setState({ latitude: latitude, longitude: longitude });

  };


  _sendLocationAsync = async () => {
    // user url
    let url = 'https://oasis-notes.herokuapp.com/locations/'
    let user_url = await AsyncStorage.getItem('user_url');
    // token
    let userToken = await AsyncStorage.getItem('userToken');
    let token = 'Token ' + userToken;
    // location
    console.log('Sleeping');
    await new Promise(resolve => setTimeout(resolve, 3000));
    let user_location = {
      'coords': this.state.latitude,
      'user': user_url,
    };
    console.log(JSON.stringify(user_location));
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user_location),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token,
        }
      });
      const json = await response.json();
      console.warn('Logged User Location');
    } catch (error) {
      console.error('Error:', error);
    }
    
    
  };


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  item: {
    backgroundColor: '#95a5a6',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
    fontSize: 14,
  },
  text: {
    fontSize:16,
  },
  userText: {
    fontSize: 18,
    color: '#34495e'
  }
});


export default HomeScreen;