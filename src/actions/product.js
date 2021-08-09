import axios from 'axios';
import { setAlert } from './alert';
import { BACKEND_URL, 
    CREATE_PRODUCT_SUCCESS, 
    CREATE_PRODUCT_FAIL,  
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_FAIL,
    ADD_FEATURE_FAIL,
    DELETE_PRODUCT_SUCCESS,
    ADD_FEATURE_SUCCESS,
    ADD_AI_SUCCESS,
    ADD_AI_FAIL,
    ADD_VIDEO_SUCCESS,
    ADD_VIDEO_FAIL
} from './types';


// Create
export const createProduct = (data) => async dispatch => {
    if (localStorage.getItem('access')) {
        const formData = new FormData()
        formData.append('title', data.title);
        formData.append('brand', data.brand);
        formData.append('subcategory', data.subcategory);
        data.productImage && formData.append('picture', data.productImage.picture[0]);
        formData.append('first_price', data.first_price);
        formData.append('last_price', data.last_price);
        formData.append('body', data.body);

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        try {
            const response = await axios.post(`${BACKEND_URL}/products/`, formData, config)
            dispatch({
                type: CREATE_PRODUCT_SUCCESS,
                payload: response.data
            });
            localStorage.getItem('i18nextLng') === 'ru' && dispatch(setAlert('Продукт успешно импортирован', 'success'));
            localStorage.getItem('i18nextLng') === 'kz' && dispatch(setAlert('Өнім сәтті импортталды', 'success'));

        } catch (error) {
            dispatch({ type: CREATE_PRODUCT_FAIL });
            localStorage.getItem('i18nextLng') === 'ru' && dispatch(setAlert('Произошла ошибка при импорте продукции', 'error'));
            localStorage.getItem('i18nextLng') === 'kz' && dispatch(setAlert('Өнім импорттауда қателік кетті', 'error'));
        }
    } else {
        dispatch({ type: CREATE_PRODUCT_FAIL });
        localStorage.getItem('i18nextLng') === 'ru' && dispatch(setAlert('Произошла ошибка при импорте продукции', 'error'));
        localStorage.getItem('i18nextLng') === 'kz' && dispatch(setAlert('Өнім импорттауда қателік кетті', 'error'));
    }
}

// Update
export const updateProduct = (data) => async dispatch => {
    if (localStorage.getItem('access')) {
        const formData = new FormData()
        formData.append('title', data.title);
        formData.append('brand', data.brand);
        formData.append('subcategory', data.subcategory);
        data.productImage && formData.append('picture', data.productImage.picture[0]);
        formData.append('first_price', data.first_price);
        formData.append('last_price', data.last_price);
        formData.append('body', data.body);

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        try {
            const response = await axios.put(`${BACKEND_URL}/product/${data.owner}/${data.isbn_code}/`, formData,  config);
            dispatch({
                type: UPDATE_PRODUCT_SUCCESS,
                payload: response.data
            });
            localStorage.getItem('i18nextLng') === 'ru' && dispatch(setAlert('Продукт успешно изменено', 'success'));
            localStorage.getItem('i18nextLng') === 'kz' && dispatch(setAlert('Өнім сәтті өзгертілді', 'success'));

        } catch (error) {
            dispatch({ type: UPDATE_PRODUCT_SUCCESS });
            localStorage.getItem('i18nextLng') === 'ru' && dispatch(setAlert('Произошла ошибка при изменение продукции', 'error'));
            localStorage.getItem('i18nextLng') === 'kz' && dispatch(setAlert('Өнімді өзгету кезінде қателік кетті', 'error'));
        }
    } else {
        dispatch({ type: UPDATE_PRODUCT_FAIL });
        localStorage.getItem('i18nextLng') === 'ru' && dispatch(setAlert('Произошла ошибка при изменение продукции', 'error'));
        localStorage.getItem('i18nextLng') === 'kz' && dispatch(setAlert('Өнімді өзгету кезінде қателік кетті', 'error'));
    }
}


// Delete
export const deleteProduct = data => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        try {
            await axios.delete(`${BACKEND_URL}/product/${data.owner}/${data.isbn_code}/`, config)
            dispatch({ type: DELETE_PRODUCT_SUCCESS });
            localStorage.getItem('i18nextLng') === 'ru' && dispatch(setAlert('Продукт успешно удалено', 'success'));
            localStorage.getItem('i18nextLng') === 'kz' && dispatch(setAlert('Өнім сәтті жойылды', 'success'));
            
        } catch(e) {
            dispatch({ type: DELETE_PRODUCT_FAIL });
            localStorage.getItem('i18nextLng') === 'ru' && dispatch(setAlert('Произошла ошибка при удаление продукции', 'error'));
            localStorage.getItem('i18nextLng') === 'kz' && dispatch(setAlert('Өнімді жою кезінде қателік кетті', 'error'));
        }
    } else {
        dispatch({ type: DELETE_PRODUCT_FAIL });
        localStorage.getItem('i18nextLng') === 'ru' && dispatch(setAlert('Произошла ошибка при изменение продукции', 'error'));
        localStorage.getItem('i18nextLng') === 'kz' && dispatch(setAlert('Өнімді өзгетуде қателік кетті', 'error'));
    }
}


// Feature
export const addFeature = data => async dispatch => {
    const { owner, isbn_code, label, value } = data
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        try {
            axios.post(`${BACKEND_URL}/product/${owner}/${isbn_code}/features/`, {label, value}, config)
            dispatch({ type: ADD_FEATURE_SUCCESS });
            localStorage.getItem('i18nextLng') === 'ru' && dispatch(setAlert('Характеристика успешно добавлено', 'success'));
            localStorage.getItem('i18nextLng') === 'kz' && dispatch(setAlert('Өнім сипаттамасы сәтті жасалды', 'success'));
            
        } catch(e) {
            dispatch({ type: ADD_FEATURE_FAIL });
            localStorage.getItem('i18nextLng') === 'ru' && dispatch(setAlert('Произошла ошибка при добавление характеристики', 'error'));
            localStorage.getItem('i18nextLng') === 'kz' && dispatch(setAlert('Өнім сипаттамасын жою кезінде қателік кетті', 'error'));
        }
    } else {
        dispatch({ type: ADD_FEATURE_FAIL });
        localStorage.getItem('i18nextLng') === 'ru' && dispatch(setAlert('Произошла ошибка при добавление характеристики', 'error'));
        localStorage.getItem('i18nextLng') === 'kz' && dispatch(setAlert('Өнім сипаттамасын жою кезінде қателік кетті', 'error'));
    }
}


// AI
export const addAI = data => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        try {
            const imageData = new FormData();
            data.AImage && imageData.append('image', data.AImage.image[0]);
            axios.post(`${BACKEND_URL}/product/${data.owner}/${data.isbn_code}/ais/`, imageData, config)
            dispatch({ type: ADD_AI_SUCCESS });
            localStorage.getItem('i18nextLng') === 'ru' && dispatch(setAlert('Дополнительное изображение успешно загружено', 'success'));
            localStorage.getItem('i18nextLng') === 'kz' && dispatch(setAlert('Қосымша сурет сәтті жүктелді', 'success'));
            
        } catch(e) {
            dispatch({ type: ADD_AI_FAIL });
            localStorage.getItem('i18nextLng') === 'ru' && dispatch(setAlert('Произошла ошибка при загрузке дополнительного изображения', 'error'));
            localStorage.getItem('i18nextLng') === 'kz' && dispatch(setAlert('Қосымша суретті жүктеу кезінде қателік кетті', 'error'));
        }
    } else {
        dispatch({ type: ADD_AI_FAIL});
        localStorage.getItem('i18nextLng') === 'ru' && dispatch(setAlert('Произошла ошибка при загрузке дополнительного изображения', 'error'));
        localStorage.getItem('i18nextLng') === 'kz' && dispatch(setAlert('Қосымша суретті жүктеу кезінде қателік кетті', 'error'));
    }
}


// Videohosting
export const addVideo = data => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        try {
            await axios.post(`${BACKEND_URL}/product/${data.owner}/${data.isbn_code}/videohosting/`, data.videoData, config)
            dispatch({ type: ADD_VIDEO_SUCCESS });
            localStorage.getItem('i18nextLng') === 'ru' && dispatch(setAlert('Видео успешно добавлено', 'success'));
            localStorage.getItem('i18nextLng') === 'kz' && dispatch(setAlert('Видео сәтті жасалды', 'success'));
            
        } catch(e) {
            dispatch({ type: ADD_VIDEO_FAIL });
            localStorage.getItem('i18nextLng') === 'ru' && dispatch(setAlert('Произошла ошибка при добавление видео', 'error'));
            localStorage.getItem('i18nextLng') === 'kz' && dispatch(setAlert('Видеоны жасау кезінде қателік кетті', 'error'));
        }
    } else {
        dispatch({ type: ADD_VIDEO_FAIL });
        localStorage.getItem('i18nextLng') === 'ru' && dispatch(setAlert('Произошла ошибка при изменение продукции', 'error'));
        localStorage.getItem('i18nextLng') === 'kz' && dispatch(setAlert('Өнімді өзгетуде қателік кетті', 'error'));
    }
}
