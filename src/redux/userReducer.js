import {USER} from "../utils/Globals";

const initialState = {
    user: ""
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER:
            let newState = {
                user: action.user
            }
            return newState;
        default:
            return state
    }
}

export default userReducer