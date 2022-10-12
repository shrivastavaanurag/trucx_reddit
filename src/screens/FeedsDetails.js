import React, { Component, useState } from 'react';
import { SafeAreaView, View, Image, Text, FlatList, TouchableOpacity, Dimensions, StyleSheet, Animated } from 'react-native';
import axios from 'axios';
import {getData} from "../utils/AsyncStorage";
import {actions, BASE_URL, REDDIT_ACCESS_TOKEN} from "../utils/Globals";
import VideoPlayer from "../components/VideoPlayer";
import Filter from "../components/Fliter";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAllPosts, getComments} from "../redux/action";
import FeedItem from "../components/FeedItem";
import {interpolateColor, useAnimatedStyle} from "react-native-reanimated";
import BottomSheet, { BottomSheetFlatList, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {deviceHeight, deviceWidth} from "../utils/dimensions";
import moment from "moment";
import {GetSubRedditIcons} from "../components/GetSubRedditIcons";
import {GetAuthorImage} from "../components/GetAuthorImage";
import CommentItem from "../components/CommentItem";

class FeedsDetails extends Component {

    constructor(props){
        super(props);
        this.state = {
            redditData: [],
            imageUrl: null,
            height: deviceWidth / (16 / 9),
            filter: 'top',
            item: this.props && this.props.route && this.props.route.params && this.props.route.params.item,
            hideFooter: false,
            openSheet: false,
            isOpen: false,
            snapsPoint: 0,
        }

        this.bottomSheetRef = React.createRef();
        this.flatListRef = React.createRef();
    }

    handleSheetChanges = index => {
        let status = index === 0 ? false : true;
        this.setState({ isOpen: status }, () => {
            this.getsheetStatus(status);
        });
    };

    getsheetStatus = e => {
        this.setState({ hideFooter: e, openSheet: e }, () => {

        });
    };

    CustomBackground = ({ style, animatedIndex }) => {
        //#region styles
        const containerAnimatedStyle = useAnimatedStyle(() => ({
            // @ts-ignore
            backgroundColor: interpolateColor(
                animatedIndex.value,
                [0, 1],
                ['#a3a3a3', '#a3a3a3'],
            ),
        }));

        //#endregion

        // render
        return (
            <Animated.View
                pointerEvents="none"
                style={[style, containerAnimatedStyle]}
            />
        );
    };

    CustomHandle = () => {
        return (
            <View
                style={{ alignSelf: 'center', backgroundColor: "transparent", width: 35, height: 6, borderRadius: 50 }}
            />
        );
    };

    componentDidMount = async () => {
        /* const options = {
             method: 'GET',
             url: 'https://oauth.reddit.com/api/v1/me',
             headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
                 Authorization: 'Bearer ' + await getData(REDDIT_ACCESS_TOKEN),
             },
         };*/

        this.getComments()
    };


    getComments = () => {

        const options = {
            method: 'GET',
            url: BASE_URL + 'r/' + this.state.item.item.data.subreddit + '/comments/' + this.state.item.item.data.id + '/irrelevant_string.json?depth=1&limit=100&showmedia=true&sort=new&threaded=false'
        };

        axios
            .request(options)
            .then((res) => {
                let arr = [];
                res.data.map((item, index) => {
                    item.data.children.map(item1 => {
                        if (item1.kind.toLowerCase() === 't1') {
                            arr.push(item1)
                        }
                    })
                });

                this.props.getComments(arr)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        return <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <FeedItem isPressable={false} item={this.state.item} />


                <BottomSheet
                    handleComponent={this.CustomHandle}
                    animateOnMount={true}
                    backgroundComponent={this.CustomBackground}
                    onChange={this.handleSheetChanges}
                    ref={this.bottomSheetRef}
                    initialSnapIndex={2}
                    snapPoints={[300, deviceHeight - 50]}>

                    <BottomSheetFlatList
                        ref={ref => this.flatListRef = ref}
                        onContentSizeChange={() => this.flatListRef.scrollToEnd({ animated: true })}
                        onLayout={() => this.flatListRef.scrollToEnd({ animated: true })}
                        showsVerticalScrollIndicator={false}
                        data={this.props.comments}
                        // initialScrollIndex={comments.length - 1}
                        renderItem={({ item, index }) => {
                            return (
                                <CommentItem item={item}/>
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        style={{ width: '100%', height: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, }}
                        contentContainerStyle={{
                            width: deviceWidth, backgroundColor: '#ffffff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20
                        }}
                    />

                </BottomSheet>

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
    comments: state.commentReducer.comments,
});

const mapDispatchToProps = dispatch => ({
    getComments: bindActionCreators(getComments, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedsDetails);