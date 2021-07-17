import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from "react-hook-form";

import Loader from '../../components/Loader';
import { motion } from "framer-motion";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { LOCAL_URL } from '../../actions/types';



const MessageContainer = styled.div`
    display: flex;
    align-items: flex-start;
    width: 1280px;
    margin: 0 auto;
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
    const [created, setCreated] = useState(false)

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
                <p>Сообщение</p>
                <h3>Вы можете отправить нам письмо здесь</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="">Тема</label>
                        <input type="text" {...register("title")} placeholder="Тема вашего вопроса" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Тело сообщение</label>
                        <textarea {...register("body")} cols="50" rows="5"></textarea>
                    </div>
                    <div className="submit">
                        {disable ? <Loader /> : <input type="submit" value="Отправить" />}
                    </div>
                </form>
            </motion.div>}
        </MessageContainer>
    )
}

export default Message