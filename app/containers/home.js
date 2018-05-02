/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import NFC, {NdefRecordType, NfcDataType} from 'react-native-nfc';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

NFC.addListener((payload) => {
  switch (payload.type) {
    case NfcDataType.NDEF:
      let messages = payload.data;
      for (let i in messages) {
        let records = messages[i];
        for (let j in records) {
          let r = records[j];
          if (r.type === NdefRecordType.TEXT) {
            // do something with the text data
          } else {
            ToastAndroid.show(
              `Non-TEXT tag of type ${r.type} with data ${r.data}`,
              ToastAndroid.SHORT
            );
          }
        }
      }
      break;
    case NfcDataType.TAG:
      ToastAndroid.show(
        `The TAG is non-NDEF:\n\n${payload.data.description}`,
        ToastAndroid.SHORT
      );
      break;
  }
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});