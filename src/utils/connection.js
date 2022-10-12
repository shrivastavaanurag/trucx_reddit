import React, {Component, useCallback, useState, useEffect} from 'react';
import {authorize} from 'react-native-app-auth';
import {storeData} from "./AsyncStorage";
import {BASE_URL, REDDIT_ACCESS_TOKEN} from "./Globals";
import {getAllPosts, getUser} from "../redux/action";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const config = {
    redirectUrl: 'com.trucxreddit://oauth2redirect/reddit',
    clientId: 'Zt5U3JzpY3SIH9XKUEssIQ',
    clientSecret: '',
    scopes: [
        'identity',
        'edit',
        'subscribe',
        'save',
        'submit',
        'read',
        'modconfig',
        'account',
        'vote',
        'flair',
        'mysubreddits',
    ],
    serviceConfiguration: {
        authorizationEndpoint: BASE_URL + 'api/v1/authorize.compact',
        tokenEndpoint: BASE_URL + 'api/v1/access_token',
    },
    customHeaders: {
        token: {
            Authorization: 'Basic Zt5U3JzpY3SIH9XKUEssIQ==',
        },
    },
};

class Connection extends Component {


    constructor(props) {
        super(props);
        this.state = {
            token: null,
            tokenExpiration: null,
            refreshToken: null
        }
    }

    async componentDidMount() {
        try {
            const authState = await authorize(config);
            this.setState({
                token: authState.accessToken,
                tokenExpiration: authState.accessTokenExpirationDate,
                refreshToken: authState.refreshToken,
            });

            this.props.getUser(authState.accessToken);
            await storeData(REDDIT_ACCESS_TOKEN, this.props.user);

            this.props.navigation.replace('HomePage');
        } catch (e) {
            this.props.navigation.pop();
            console.log(e);
        }
    }

    render() {
        return null
    }

}

const mapStateToProps = state => ({
    user: state.userReducer.user,
});

const mapDispatchToProps = dispatch => ({
    getUser: bindActionCreators(getUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Connection);