import {COMMENTS, POSTS, USER} from "../utils/Globals";

export const getAllPosts = (posts) => {
    return dispatch => {
        dispatch({
            type: POSTS,
            posts: posts
        })
    };
};

export const getUser = (user) => {
    return dispatch => {
        dispatch({
            type: USER,
            user: user
        })
    };
};


export const getComments = (comments) => {
    return dispatch => {
        dispatch({
            type: COMMENTS,
            comments: comments
        })
    };
};