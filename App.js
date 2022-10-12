import React, {Component} from 'react';
import {AppState, Dimensions, LogBox, Platform, StatusBar, StyleSheet, View,} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import NavigationService from './src/navigation/NavigationService';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class App extends Component {
    constructor(props) {
        super(props);

        LogBox.ignoreLogs(['Class RCTCxxModule']);
        this.state = {

        };
    }

    async componentDidMount() {

        if (!__DEV__) {
            console.log = () => null;
        }

    }


    componentWillUnmount() {
    }

    render() {
        return (
            <View
                style={[
                    styles.container,
                    {backgroundColor: '#ffa31a'},
                ]}>
                <StatusBar translucent backgroundColor="transparent"/>
                <View style={styles.navigatorView}>
                    <AppNavigator
                        refs={navigatorRef => {
                            NavigationService.init(navigatorRef);
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // height: deviceHeight,
        justifyContent: 'center',
        width: '100%',

        flex: 1,
    },
    navigatorView: {
        flex: 1,
        width: '100%',

    },
});

const mapStateToProps = state => ({
   // isAppReload: state.appReloadReducer.isAppReload,
});

const mapDispatchToProps = dispatch => ({
    // refreshWithRedux: bindActionCreators(refreshWithRedux, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
