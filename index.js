/**
 * @format
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import postReducer from './src/redux/postReducer'
import commentReducer from './src/redux/commentReducer'
import userReducer from './src/redux/userReducer'

const store = createStore(
    combineReducers({
        postReducer,
        commentReducer,
        userReducer
    }),
    applyMiddleware(thunk),
);

class RNRedux extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <App />
                </NavigationContainer>
            </Provider>
        );
    }
}

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(RNRedux));
// AppRegistry.registerComponent(appName, () => App);
