import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';

type Props = {};

class Anonymous extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{backgroundColor: 'red'}}
          data={[
            {id: 'a', name: 'name'},
            {id: 'b', name: 'name'},
            {id: 'c', name: 'name'},
            {id: 'd', name: 'name'},
            {id: 'e', name: 'name'},
            {id: 'f', name: 'name'},
          ]}
          renderItem={
            ({item}) => <Text style={{height: 50, backgroundColor: 'yellow'}}>{item.name}</Text>} />
      </View>
    );
  }
}

const mapStateProps = null;
const mapDispatchProps = null;

export default connect(mapStateProps, mapDispatchProps)(Anonymous);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
