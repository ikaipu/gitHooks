import 'core-js'; // it needs for catching unhandled promise
import 'react-devtools';
import {AppRegistry} from 'react-native';
import 'react-native-console-time-polyfill';
import index from './app/index';

AppRegistry.registerComponent('attendance', () => index);
