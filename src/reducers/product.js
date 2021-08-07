import { 
    CREATE_PRODUCT_SUCCESS, 
    CREATE_PRODUCT_FAIL, 
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_SUCCESS,
    ADD_FEATURE_SUCCESS,
    ADD_AI_FAIL,
    ADD_VIDEO_SUCCESS,
    ADD_VIDEO_FAIL,
    ADD_FEATURE_FAIL,
    ADD_AI_SUCCESS,
    DELETE_PRODUCT_FAIL,
} from "../actions/types";


const initialState = {
    product: {},
}

export const product = (state=initialState, action) => {
    const {type, payload } = action;
    switch(type) {
        case CREATE_PRODUCT_SUCCESS:
        case UPDATE_PRODUCT_SUCCESS:
        case DELETE_PRODUCT_SUCCESS:
        case ADD_FEATURE_SUCCESS:
        case ADD_AI_SUCCESS:
        case ADD_VIDEO_SUCCESS:
            return {
                ...state,
                product: payload
            }
        case CREATE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
        case DELETE_PRODUCT_FAIL:
        case ADD_FEATURE_FAIL:
        case ADD_AI_FAIL:
        case ADD_VIDEO_FAIL:
            return {
                ...state,
            }
        default:
            return state;
    }
}


export default product