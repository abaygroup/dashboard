import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

import Loader from '../../components/Loader';
import { motion } from "framer-motion";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { BACKEND_URL, item } from '../../actions/types';

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
        const formData = new FormData()
        formData.append('title', data.title);
        formData.append('body', data.body);

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            }
            await axios.post(`${BACKEND_URL}/notification/`, formData, localStorage.getItem('access') && config);
            setDisable(false);
            setCreated(true)
        } catch (e) {
            console.error(e.message)
        }
    };

    useEffect(() => setLoading(false), [])

    if (created) {
        return <Redirect to="/" />
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
                        {t('dashboard.message.instruction.text.first')}
                        <ul>
                            <li>{t('dashboard.message.instruction.text.second')}</li>
                            <li>{t('dashboard.message.instruction.text.third')}</li>
                            <li>{t('dashboard.message.instruction.text.four')}</li>
                        </ul>
                        {t('dashboard.message.instruction.text.last')}
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