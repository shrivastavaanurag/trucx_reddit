import React, { Component, useState } from 'react';
import { SafeAreaView, View, Image, Text, FlatList, TouchableOpacity, RefreshControl, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import {getData} from "../utils/AsyncStorage";
import {actions, BASE_URL, REDDIT_ACCESS_TOKEN} from "../utils/Globals";
import VideoPlayer from "../components/VideoPlayer";
import Filter from "../components/Fliter";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAllPosts} from "../redux/action";
import FeedItem from "../components/FeedItem";
import {deviceHeight, deviceWidth} from "../utils/dimensions";

class HomePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            redditData: [],
            imageUrl: null,
            height: deviceWidth / (16 / 9),
            filter: 'top',
            refreshFeeds: false,
            isLoading: false
        }

    }

    componentDidMount = async () => {
       this.getFeeds()
    };

    getFeeds = (isRefresh = false) => {
        this.setState({ refreshFeeds: isRefresh, isLoading: true });
        const options = {
            method: 'GET',
            url: BASE_URL + 'r/all/' + this.state.filter + '.json?limit=100'
        };

        axios
            .request(options)
            .then((res) => {
                this.setState({ refreshFeeds: false, isLoading: false });
                this.props.getAllPosts(res.data.data.children);
            })
            .catch((error) => {
                this.setState({ refreshFeeds: false, isLoading: false });
                console.error(error);
            });
    };



    render() {
        return <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>

                <View style={styles.headerFilter} >
                {
                    actions.map((item, index) => {
                        return Filter(index, item, () => {
                            this.setState({
                                filter: item.name
                            }, () => {
                                this.getFeeds()
                            })
                        })
                    })
                }
                </View>

                {
                    this.state.isLoading ?
                        <View style={{ height: '100%', width: deviceWidth, backgroundColor: '#00000050', justifyContent: 'center', alignItems: 'center' }} >
                            <ActivityIndicator style={{ alignSelf: 'center' }} size="large" color={'#ffffff'} />
                            <Text style={{ color: '#ffffff', fontSize: 14, padding: 20 }}>{"Loading Top Feeds..."}</Text>
                        </View>
                        :
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            bounce={false}
                            data={this.props.posts}
                            renderItem={(item, index) => {
                                return (
                                    item && item.item && item.item.data.thumbnail.toLowerCase() !== ('self' || 'default') ? <View style={{  width: '100%', marginTop: 10  }} key={index}>
                                        <FeedItem isPressable={true} onPress={() => {
                                            this.props.navigation.navigate("FeedsDetails", {item: item})
                                        }} item={item} />
                                    </View> : null
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{}}
                            style={{
                                flex: 1,
                            }}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshFeeds}
                                    onRefresh={this.getFeeds.bind(this, true)}
                                />
                            }
                        />
                }

            </View>
        </SafeAreaView>
    }
}


const styles = StyleSheet.create({
    headerFilter: {
        paddingVertical: 20, width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', borderBottomWidth: 1, borderBottomColor: '#d3d3d3'
    }
})

const mapStateToProps = state => ({
    posts: state.postReducer.posts,
});

const mapDispatchToProps = dispatch => ({
    getAllPosts: bindActionCreators(getAllPosts, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);