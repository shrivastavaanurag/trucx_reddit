import {COMMENTS} from "../utils/Globals";

const initialState = {
    comments: []
};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case COMMENTS:
            let newState = {
                comments: action.comments
            }
            return newState;
        default:
            return state
    }
}

export default commentReducer