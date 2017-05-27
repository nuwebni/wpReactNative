import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
  AsyncStorage,
  Image
} from 'react-native';
import { Actions }from 'react-native-router-flux';
const ACCESS_TOKEN = 'access_token';

class Posts extends React.Component {

constructor(props) {
  super(props)
  var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
      dataSource: dataSource.cloneWithRows(this.props.posts)
    }
	}

componentDidMount() {

}

renderRow(rowData, sectionID, RowID) {
    return (
    <View style={styles.listItem}>
      <View style={styles.listRow}>
        <Text style={styles.listItemText}  numberOfLInes={1}>{rowData.title.rendered}</Text>
      </View>
      <View style={styles.seperator} />
    </View>
    );
}
render() {
    var CurrentView = <ListView style={styles.todoListView} enableEmptySections={true} dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} />;
		return(
    <View style={styles.container}>
    <Image
     style={styles.logo}
     source={require('../icons/logo.png')}
     />
    <Text style={styles.title}>Current Posts</Text>
      {CurrentView}
    </View>
	    );
    }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: 20,
    width: 200,
    height: 110
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  todoListView: {
    width: 350

  },
  listItem: {

  },
  listRow: {
    height: 40,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  seperator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  },
  listItemText: {
    fontSize: 18
  }
});

export default Posts;
