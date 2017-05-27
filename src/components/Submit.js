import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  AlertIOS,
  Image
} from 'react-native';
import { Actions }from 'react-native-router-flux';
const ACCESS_TOKEN = 'access_token';

class Submit extends React.Component {

constructor() {
  super()
	this.state = {
     title: '',
     content: '',
     token: ''
   }
	}

componentDidMount() {
  this.getToken();
}

async getToken() {
  try {
    let token = await AsyncStorage.getItem(ACCESS_TOKEN);
    this.setState ({
      token: token
    })
  } catch(error) {
    console.log('Something went wrong getting Token')
  }
}

postSubmit() {
  var fetchUrl = "https://sancochero.com/wp-json/wp/v2/posts"
  fetch(fetchUrl, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.token
    },
    body: JSON.stringify({
      title: this.state.title,
      content: this.state.content,
      status: 'publish'
    })
    }).then(function(response) {
          return response.json();
    }).then((responseData) => {
          return responseData;
    }).then(() => {
          this.setState({
            title: '',
            content: ''
          })
          AlertIOS.alert(
            'Your post has been submitted',
          );
          Actions.pop();
    }).catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
          AlertIOS.alert(
            'It appears you are not connected to the internet.',
            'Please try again.'
          );
    });
}

changeTitle(title){
    this.setState({title})
}

changeContent(content){
    this.setState({content})
}

render() {
	return(
    <View style={styles.Container}>
      <Image
        style={styles.logo}
        source={require('../icons/logo.png')}
      />
      <TextInput
        style={styles.inputTitle}
        placeholder='Post Title'
        value={this.state.title}
        onChangeText={(title) => this.changeTitle(title)}
      />
      <TextInput
        style={styles.inputContent}
        multiline={true}
        placeholder='Content'
        value={this.state.content}
        onChangeText={(content) => this.changeContent(content)}
      />
      <TouchableOpacity onPress={() => this.postSubmit()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}> Submit </Text>
        </View>
      </TouchableOpacity>
    </View>
	    );
    }
}

var styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 110,
    marginBottom: 20
  },
  inputTitle: {
    height: 40,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  inputContent: {
    height: 200,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 350,
    backgroundColor: 'green'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default Submit;
