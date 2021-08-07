export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const ACTIVATION_SUCCESS = 'ACTIVATION_SUCCESS';
export const ACTIVATION_FAIL = 'ACTIVATION_FAIL';
export const USER_LOADED_SUCCESS = 'USER_LOADED_SUCCESS';
export const USER_LOADED_FAIL = 'USER_LOADED_FAIL';
export const AUTHENTICATED_SUCCESS = 'AUTHENTICATED_SUCCESS';
export const AUTHENTICATED_FAIL = 'AUTHENTICATED_FAIL';
export const PASSWORD_RESET_FAIL = 'PASSWORD_RESET_FAIL';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_CONFIRM_FAIL = 'PASSWORD_RESET_CONFIRM_FAIL';
export const PASSWORD_RESET_CONFIRM_SUCCESS = 'PASSWORD_RESET_CONFIRM_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAIL = 'CREATE_PRODUCT_FAIL';

export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAIL = 'UPDATE_PRODUCT_FAIL';

export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAIL = 'DELETE_PRODUCT_FAIL';

export const ADD_FEATURE_SUCCESS = 'ADD_FEATURE_SUCCESS';
export const ADD_FEATURE_FAIL = 'ADD_FEATURE_FAIL';
export const ADD_AI_SUCCESS = 'ADD_AI_SUCCESS';
export const ADD_AI_FAIL = 'ADD_AI_FAIL';
export const ADD_VIDEO_SUCCESS = 'ADD_VIDEO_SUCCESS';
export const ADD_VIDEO_FAIL = 'ADD_VIDEO_FAIL';


// URL
// export const BACKEND_URL = 'http://127.0.0.1:8000';
export const BACKEND_URL = 'https://api.abaystreet.com';

// Get Token
export const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`
    }
}

// Frame motion
export const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
}