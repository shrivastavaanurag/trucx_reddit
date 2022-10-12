import {POSTS} from "../utils/Globals";

const initialState = {
    posts: []
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POSTS:
            let newState = {
                posts: action.posts
            }
            return newState;
        default:
            return state
    }
}

export default postReducer