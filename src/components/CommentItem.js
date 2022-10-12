import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Dimensions} from "react-native";
import VideoPlayer from "./VideoPlayer";
import {GetSubRedditIcons} from '../components/GetSubRedditIcons'
import moment from 'moment';
import FeedsDetails from "../screens/FeedsDetails";
import {deviceWidth} from "../utils/dimensions";
import {GetAuthorImage} from "./GetAuthorImage";

export default class CommentItem extends Component {


    render() {

        const {item} = this.props;

        return <View style={{ width: '100%', marginBottom: 10 }}>
            <View style={{ paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
                {item && item.data && !item.data.author.includes('deleted') && <GetAuthorImage username={item.data.author}/>}
                {item && item.data && <Text style={{ color: '#000000', fontSize: 12, }}>{item.data.author} • </Text> }
                {item && item.data && <Text style={{ color: '#888888', fontSize: 12, }}>{
                    moment.unix(new Date(item.data.created)).fromNow()
                } </Text> }
            </View>
            <Text style={{ paddingLeft: 20, color: '#000000', fontSize: 14 }}>
                {item.data.body}
            </Text>
        </View>

    }

}