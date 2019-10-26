import React from 'react';
import { 
  AsyncStorage,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  View,
  Dimensions
 } from 'react-native';
import { ExpoLinksView } from '@expo/samples';



class CreateNoteScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      text: '',
      title: '',
  }
  }


  render() {
    return (
    <View style={styles.container}>
        <Button title="Create Note" onPress={this._createNote} />
        <View style={styles.inputs}>
            <TextInput
            style={styles.input}
            placeholder="Note Title"
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
            />
            <TextInput
            style={styles.input}
            placeholder="Note Text"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            />
          </View>
    </View>
    )}

    _createNote = async () => {
      const user_url = await AsyncStorage.getItem('user_url');

      let note = {
        'title': this.state.title, 
        'text':this.state.text, 
        'user': user_url,
        };

      let url = 'https://oasis-notes.herokuapp.com/notes/'

      const userToken = await AsyncStorage.getItem('userToken');
      let token = 'Token ' + userToken;

      console.log(note);
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(note),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          }
        });
        const json = await response.json();
        this.props.navigation.navigate('Home');
        alert('Note Created')
        //clearText();
      } catch (error) {
        console.error('Error:', error);
      }


    };

    clearText = () => {
      this.setState({
          user: '',
          text: '',
          title: '',
      })
    }
}

CreateNoteScreen.navigationOptions = {
  title: 'Create Note',
};

let { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputs:{
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
});


export default CreateNoteScreen;