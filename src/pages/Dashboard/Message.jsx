import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from "react-hook-form";

import Loader from '../../components/Loader';
import { motion } from "framer-motion";
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { LOCAL_URL } from '../../actions/types';

import { useTranslation } from 'react-i18next';


const MessageContainer = styled.div`
    display: flex;
    align-items: flex-start;
    width: 1280px;
    margin: 0 auto;

    .message {
        margin-top: 20px;
        display: flex;
        justify-content: center;

        .instruction {
            width: 50%;
            margin: 0 20px 20px 20px;
            display: inline-block;
            h4 {
                text-align: left;
                padding-left: 5px;
                padding-bottom: 5px;
                border-bottom: 1px solid ${({theme}) => theme.borderColor};
            }
            small {
                ul {
                    margin: 10px 40px;
                    line-height: 1.5;
                }
            }
        }

        form {
            width: 50%;
            margin: 0 20px 20px 20px;
            h4 {
                text-align: left;
                padding-bottom: 5px;
                
                border-bottom: 1px solid ${({theme}) => theme.borderColor};
            }

            .form-group {
                padding: 10px 0;

                label {
                    display: inline-block;
                    font-size: 14px;
                    margin: 0 5px;
                }
                input, textarea {
                    display: inline-block;
                    margin: 0 5px;
                    padding: 5px 10px;
                    border-radius: 5px;
                    border: 1px solid ${({theme}) => theme.borderColor};
                    color: ${({theme}) => theme.color};
                    background: ${({theme}) => theme.background};
                    font-family: "Inter", sans-serif;
                }
                textarea {
                    resize: vertical;
                    display: block;
                }

                span {
                    display: inline-block;
                    padding: 5px 10px;
                    cursor: pointer;
                }
            }
            .submit {
                input {
                    display: inline-block;
                    padding: 5px 15px;
                    border: 1px solid black;
                    color: ${({theme}) => theme.btnColor};
                    transition: all .3s;
                    background: ${({theme}) => theme.btnBackground};
                    border-radius: 5px;
                    font-size: 14px;
                    cursor: pointer;
                    font-weight: 400;
                    font-family: 'Inter', sans-serif;
        
                    &:hover {
                        border: 1px solid ${({theme}) => theme.btnBackground};
                        color: ${({theme}) => theme.btnBackground};
                        background: transparent;
                    }

                    &:disabled {
                        opacity: .5;
                        cursor: inherit;
                    }
                }
            }
        }
    }
`;

const Center = styled.div`
    width: 100%;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;


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