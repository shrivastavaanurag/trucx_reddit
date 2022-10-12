import React, { useState } from 'react';
import { View, Image } from 'react-native';

import axios from "axios/index";
import {BASE_URL, NO_IMAGE} from "../utils/Globals";

export const GetAuthorImage = props => {

    const [image, setImage] = useState(null);

    const options = {
        method: 'GET',
        url: BASE_URL + 'user/' + props.username + '/about.json',
    };

    axios
        .request(options)
        .then(function (res) {
            res && res.data && res.data.data && res.data.data.snoovatar_img ? setImage(res.data.data.snoovatar_img) : setImage(NO_IMAGE)
        })
        .catch(function (error) {
            console.error(error);
        });

    return (
        <View>
            {!image ? (
                <></>
            ) : (
                <Image
                    style={{width: 30,
                        height: 30,
                        borderRadius: 63,
                        borderWidth: 1,
                        borderColor: 'black',
                        margin: 5,}}
                    source={{uri: image}}
                />
            )}
        </View>
    );
};