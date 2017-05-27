import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Image,
  TextInput,
  AlertIOS
} from 'react-native';
import { Actions }from 'react-native-router-flux';
const ACCESS_TOKEN = 'access_token';
const USER_ID = 'user_id';

class Login extends React.Component {

constructor() {
  super()
	this.state = {
     username: '',
     password: '',
     accessToken: ''
   }
	}

componentDidMount() {

}

loginButtonPressed(){
  var token = this.getToken()
}

getToken() {
  var fetchUrl = "https://sancochero.com/wp-json/jwt-auth/v1/token"
  fetch(fetchUrl, {
    method: "POST",
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
      }).then(function(response) {
           if(response.ok) {
             return response.json();
      }
           throw new Error('Network response was not ok.');
      }).then((responseData) => {
           return responseData.token;
      }).catch(function(error) {
           console.log('There has been a problem with your fetch operation: ' + error.message);
           AlertIOS.alert(
             'It appears you are not connected to the internet.',
             'Please try again.'
      );
      }).then((token) => {
        this.storeToken(token)
      });
}

storeToken(token) {
  if (token) {
    AsyncStorage.setItem(ACCESS_TOKEN, token);
    this.getPosts(token)
  }else {
    AlertIOS.alert(
     'Password/Username not recognized ',
     'Please try again.');
  }
}

getPosts() {
    return fetch('https://sancochero.com/wp-json/wp/v2/posts')
      .then((response) => response.json())
      .then((responseData) => {
        var postsList = responseData;
        Actions.posts({posts: postsList});
        return responseData;
      })
      .catch((error) => {
        console.error(error);
      });
  }

	render() {
		return(
    <View style={styles.container}>
    <Image
     style={styles.logo}
     source={require('../icons/logo.png')}
     />
      <View style={styles.formView}>
          <TextInput
         style={styles.usernameInput}
         autoCapitalize="none"
         autoCorrect= {false}
         placeholder="Username"
         onChangeText={(usr) => this.setState({username: usr})}
       />
       <View style={styles.seperator} />
       <TextInput
          style={styles.passwordInput}
          autoCapitalize="none"
          autoCorrect= {false}
          secureTextEntry= {true}
          placeholder="Password"
          onChangeText={(pass) => this.setState({password: pass})}
        />
        <View style={styles.seperator} />
          <TouchableOpacity onPress={() => {this.loginButtonPressed();}}>
            <View style={styles.loginButton}>
              <Text style={styles.loginText}>
                Login
              </Text>
            </View>
          </TouchableOpacity>
        </View>
    </View>
	    );
    }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 logo: {
   marginTop: 100,
   width: 200,
   height: 110
 },
 formView: {
   flex: 2,
   marginTop: 100,
   alignItems: 'center'
 },
 seperator: {
   height: 1,
   width: 300,
   backgroundColor: '#cccccc',
   marginBottom: 10
 },
  loginButton: {
    marginTop: 20,
    height: 40,
    width: 250,
    borderWidth: 1,
    borderColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  usernameInput: {
    height: 40,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  passwordInput: {
    height: 40,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
  	marginLeft: 20,
  	fontSize: 20
  }
});

export default Login;
