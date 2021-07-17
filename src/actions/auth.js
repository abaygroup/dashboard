import axios from 'axios';
import { setAlert } from './alert';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    LOGOUT,

    LOCAL_URL,
} from './types';



// Load user 
export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${LOCAL_URL}/auth/users/me/`, config)
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (error) {
            dispatch({ type: USER_LOADED_FAIL });
        }
    } else {
        dispatch({ type: USER_LOADED_FAIL })
    }
}

// check Authenticated
export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }; 
        const body = JSON.stringify({ token: localStorage.getItem('access') });
        try {
            const res = await axios.post(`${LOCAL_URL}/auth/jwt/verify/`, body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({ type: AUTHENTICATED_SUCCESS });

            } else {
                dispatch({ type: AUTHENTICATED_FAIL });
            }
        } catch (err) {
            dispatch({ type: AUTHENTICATED_FAIL });
        }
    } else {
        dispatch({ type: AUTHENTICATED_FAIL });
    }
};

// Login
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const body = JSON.stringify({email, password});
    try {
        const res = await axios.post(`${LOCAL_URL}/auth/jwt/create/`, body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        if (localStorage.getItem('i18nextLng') === 'ru') {
            dispatch(setAlert('Ваша учетная запись была успешно авторизована', 'success'))
        }
        if (localStorage.getItem('i18nextLng') === 'kz') {
            dispatch(setAlert('Сіздің аккаунтыңыз сәтті авторизацияланды', 'success'))
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        })
        if (localStorage.getItem('i18nextLng') === 'ru') {
            dispatch(setAlert('Произошла ошибка при входе в систему. Возможно, адрес электронной почты или пароль введены неверно.', 'error'))
        }
        if (localStorage.getItem('i18nextLng') === 'kz') {
            dispatch(setAlert('Кіру кезінде қате пайда болды. Электрондық пошта мекенжайы немесе құпия сөз қате енгізілген болуы мүмкін.', 'error'))
        }
    }
}

// Sign Up 
export const signup = (brandname, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({brandname, email, password, re_password})

    try {
        const res = await axios.post(`${LOCAL_URL}/auth/users/`, body, config)

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        })
        if (localStorage.getItem('i18nextLng') === 'ru') {
            dispatch(setAlert('Новая учетная запись успешно зарегистрирована', 'success'))
        }
        if (localStorage.getItem('i18nextLng') === 'kz') {
            dispatch(setAlert('Жаңа аккаунт сәтті тіркелді', 'success'))
        }
    } catch (error) {
        dispatch({ type: SIGNUP_FAIL })
        if (localStorage.getItem('i18nextLng') === 'ru') {
            dispatch(setAlert('Произошла ошибка при регистрации аккаунта', 'error'))
        }
        if (localStorage.getItem('i18nextLng') === 'kz') {
            dispatch(setAlert('Аккаунт тіркеу кезінде қате пайда болды', 'error'))
        }
    }
}

// Verify
export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${LOCAL_URL}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
        if (localStorage.getItem('i18nextLng') === 'ru') {
            dispatch(setAlert('Аккаунт успешно активирован', 'success'))
        }
        if (localStorage.getItem('i18nextLng') === 'kz') {
            dispatch(setAlert('Аккаунт сәтті активацияланды', 'success'))
        }
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
        if (localStorage.getItem('i18nextLng') === 'ru') {
            dispatch(setAlert('Произошла ошибка при активации', 'error'))
        }
        if (localStorage.getItem('i18nextLng') === 'kz') {
            dispatch(setAlert('Активациялау кезінде қате пайда болды', 'error'))
        }
    }
};


// Reset password
export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email });
    try {
        await axios.post(`${LOCAL_URL}/auth/users/reset_password/`, body, config);
        dispatch({ type: PASSWORD_RESET_SUCCESS });
        if (localStorage.getItem('i18nextLng') === 'ru') {
            dispatch(setAlert('Восстановление пароля началось. Мы отправили вам электронное письмо', 'success'))
        }
        if (localStorage.getItem('i18nextLng') === 'kz') {
            dispatch(setAlert('Құпия сөзді қалпына келтіру басталды. Біз сізге электронды хат жібердік', 'success'))
        }
    } catch (err) {
        dispatch({ type: PASSWORD_RESET_FAIL });
        if (localStorage.getItem('i18nextLng') === 'ru') {
            dispatch(setAlert('Произошла ошибка при попытке сбросить пароль', 'error'))
        }
        if (localStorage.getItem('i18nextLng') === 'kz') {
            dispatch(setAlert('Құпия сөзді қалпына келтіру кезінде қате пайда болды', 'error'))
        }
        
    }
};

// Reset password confirm
export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ uid, token, new_password, re_new_password });
    try {
        await axios.post(`${LOCAL_URL}/auth/users/reset_password_confirm/`, body, config);
        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
        if (localStorage.getItem('i18nextLng') === 'ru') {
            dispatch(setAlert('Новый пароль успешно зарегистрирован', 'success'))
        }
        if (localStorage.getItem('i18nextLng') === 'kz') {
            dispatch(setAlert('Жаңа пароль сәтті тіркелді', 'success'))
        }
        
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
        if (localStorage.getItem('i18nextLng') === 'ru') {
            dispatch(setAlert('Произошла ошибка при вводе нового пароля', 'error'))
        }
        if (localStorage.getItem('i18nextLng') === 'kz') {
            dispatch(setAlert('Жаңа пароль енгізу кезінде қате пайда болды', 'error'))
        }
        
    }
};


// Exit
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
    if (localStorage.getItem('i18nextLng') === 'ru') {
        dispatch(setAlert('Вы вышли из системы', 'success'))
    }
    if (localStorage.getItem('i18nextLng') === 'kz') {
        dispatch(setAlert('Сіз жүйеден шықтыңыз', 'success'))
    }
};