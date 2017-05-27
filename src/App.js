import React from 'react';
import Login from './components/Login';
import Posts from './components/Posts';
import Submit from './components/Submit';
import { StyleSheet, Navigator } from 'react-native';

import {
  Router,
  Scene,
  Actions
} from 'react-native-router-flux';

class App extends React.Component {
	render() {

		return (
          <Router>
            <Scene key='root' hideNavBar={true}>
            <Scene key='login' component={Login} title='Login'/>
            <Scene key='posts' component={Posts} rightTitle="New Post" onRight={() => Actions.submit()} hideNavBar={false} title='Posts'/>
            <Scene key='submit' component={Submit} hideNavBar={false} title='Submit'/>
            </Scene>
          </Router>
	    );
	}
}
var styles = StyleSheet.create({
  addButton: {
    fontSize: 18
  }
});

export default App;
