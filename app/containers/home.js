import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import NFC, {NdefRecordType, NfcDataType} from 'react-native-nfc';
import {connect} from 'react-redux';

type Props = {
  navigation: {
    navigate: () => {}
  },
};

class Home extends Component<Props> {
  render() {
    console.log(this.props);

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Anonymous')}
          style={{
            height: 50,
            backgroundColor: 'green',
          }} />
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

NFC.addListener((payload) => {
  switch (payload.type) {
    case NfcDataType.NDEF: {
      const messages = payload.data;

      messages.forEach((records) => {
        records.forEach((record) => {
          if (record.type === NdefRecordType.TEXT) {
            // do something with the text data
          } else {
            ToastAndroid.show(
              `Non-TEXT tag of type ${record.type} with data ${record.data}`,
              ToastAndroid.SHORT,
            );
          }
        });
      });
      break;
    }
    case NfcDataType.TAG: {
      ToastAndroid.show(
        `The TAG is non-NDEF:\n\n${payload.data.description}`,
        ToastAndroid.SHORT,
      );
      break;
    }
    default: {
      break;
    }
  }
});

const mapStateProps = null;
const mapDispatchProps = null;

export default connect(mapStateProps, mapDispatchProps)(Home);

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
