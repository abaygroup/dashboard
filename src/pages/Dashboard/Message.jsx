import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

import Loader from '../../components/Loader';
import { motion } from "framer-motion";
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { LOCAL_URL } from '../../actions/types';

import { useTranslation } from 'react-i18next';
import { MessageContainer } from './styles/message';
import { Center } from './styles/overview';


const Message = () => {
    const [loading, setLoading] = useState(true)
    const { register, handleSubmit } = useForm();
    const [disable, setDisable] = useState(false);
    const [created, setCreated] = useState(false);

    const { t } = useTranslation();

    const onSubmit = async (data) => {
        setDisable(true);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        const formData = new FormData()
        formData.append('title', data.title);
        formData.append('body', data.body);

        try {
            await axios.post(`${LOCAL_URL}/notification/`, formData, localStorage.getItem('access') && config);
            setDisable(false);
            setCreated(true)
        } catch (e) {
            console.error(e.message)
        }
    };

    useEffect(() => {
        setLoading(false)
    }, [])

    if (created) {
        return <Redirect to="/" />
    }

    // For motion
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }
    
    return (
        <MessageContainer>
            {loading ? <Center><Loader /></Center> :
            <motion.div
                initial="hidden" 
                animate="visible" 
                variants={item} 
                transition={{duration: 0.25}}
                className="message"
            >
                <div className="instruction">
                    <h4>{t('dashboard.message.instruction.h4')}</h4>
                    <small>
                        Вы можете импортировать товар по выбранной вами категории. 
                        Т. е. какое направление выбрал бренд, работа ведется по той же категории. 
                        Если выбранная категория неверна, <Link to={'#'}>напишите здесь</Link>

                        <ul>
                            <li>Обязательно нужно написать название товара</li>
                            <li>Для наглядности на товар нужно поставить рисунок. Но это не имеет значения. 
                                Рисунок лучше нарисовать в максимально квадратичном формате. Например 400x400
                            </li>
                            <li>
                                Обязательно нужно написать цену. Цена указана в двух видах. 
                                Первая начальная цена, верхняя цена товара. 
                                И последняя цена это последняя цена после торговли через клиента.
                            </li>
                            <li>
                                Описание товара у вас очень важное поле. А нам не важно :). 
                                Это поле можно оставить пустым. Но мы рекомендуем написать 
                                описание продукта, максимально используя это поле. Потому 
                                что продукт с четко прописанным описанием торгуется быстро.
                            </li>
                        </ul>

                        После импорта товара с подробной справкой отправляет товар на главную страницу. 
                        Там же даются формы для нанесения дополнительных рисунков на товар и выдачи 
                        дополнительной характеристики.
                    </small>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4>{t('dashboard.message.sending.h4')}</h4>
                    <div className="form-group">
                        <label htmlFor="">{t('dashboard.message.sending.title')}</label>
                        <input type="text" {...register("title")} placeholder={t('dashboard.message.sending.placeholder')} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">{t('dashboard.message.sending.body')}</label>
                        <textarea {...register("body")} cols="50" rows="5"></textarea>
                    </div>
                    <div className="submit">
                        {disable ? <Loader /> : <input type="submit" value={t('dashboard.message.sending.submit')} />}
                    </div>
                </form>
            </motion.div>}
        </MessageContainer>
    )
}

export default Message