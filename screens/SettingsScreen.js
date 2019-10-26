import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  AsyncStorage,
  View,
  Styles,
  StyleSheet,
  Button,
} from 'react-native';
import { withNavigation } from 'react-navigation';

class SettingsScreen extends React.Component {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  render() {
    return(
    <View style={styles.container}>
        <Button title="Sign me out" onPress={this._signOutAsync} />
    </View>
  )}

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
    console.log('Signed out');
  };

  
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


export default SettingsScreen;