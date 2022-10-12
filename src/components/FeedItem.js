import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Dimensions} from "react-native";
import VideoPlayer from "./VideoPlayer";
import {GetSubRedditIcons} from '../components/GetSubRedditIcons'
import moment from 'moment';
import FeedsDetails from "../screens/FeedsDetails";
import {deviceWidth} from "../utils/dimensions";

export default class FeedItem extends Component {


    render() {

        const {item} = this.props;

        return <View style={{ paddingVertical: 10,  }}>
            <TouchableOpacity activeOpacity={ this.props.isPressable ? 0.7 : 1 } style={{width: '100%'}} onPress={
                this.props.isPressable ? this.props.onPress : () => {}
            }>

                <View style={{ paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
                    {item && item.item && item.item.data && <GetSubRedditIcons subreddit={item.item.data.subreddit}/>}
                    {item && item.item && item.item.data && <View>
                        <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }}>{item.item.data.subreddit}</Text>
                        <Text style={{ color: '#888888', fontSize: 12, }}>
                            {item.item.data.author} • {moment.unix(new Date(item.item.data.created)).fromNow()}
                        </Text>
                    </View>
                        }
                </View>
                {item && item.item && item.item.data &&
                <View style={{flexDirection: 'column'}}>

                    <Text style={{ padding: 10, color: '#000000', fontSize: 18, fontWeight: 'bold'  }}>
                        {item.item.data.title}
                    </Text>

                    {
                        item && item.item && item.item.data && item.item.data.media && item.item.data.media.reddit_video && item.item.data.media.reddit_video.fallback_url ?
                            <VideoPlayer
                                isFocused={true}
                                style={{width: deviceWidth, height: 400}}
                                source={{uri: item && item.item && item.item.data && item.item.data.media && item.item.data.media.reddit_video && item.item.data.media.reddit_video.fallback_url}}
                                poster={item && item.item && item.item.data.thumbnail}
                                loop={true}
                                autoPlay={true} initialMute={false}
                                playInBackground={false}
                                showHeader={true} showFooter={true}
                                showSeeking10SecondsButton={false}
                                showCoverButton={false}
                                showFullScreenButton={false}
                                showSettingButton={false}
                                showMuteButton={true}
                            />
                            :
                            item && item.item && item.item.data.thumbnail ?
                                <Image source={{uri: item.item.data.thumbnail}}
                                       style={{width: '100%', height: 400}}/> : null
                    }


                </View>
                }

            </TouchableOpacity>
        </View>

    }

}