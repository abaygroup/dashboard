import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import { Center } from './styles/overview';
import { SettingContainer } from './styles/settings';
import axios from 'axios';
import { LOCAL_URL } from '../../actions/types';

const Settings = () => {
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit } = useForm();

    const passwordChangeSubmit = async (data) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        const formData = JSON.stringify(data)
        try {
            const response = await axios.put(`${LOCAL_URL}/accounts/password-change/`, formData, localStorage.getItem('access') && config);
            console.log(response.data);
        } catch (e) {
            console.error(e.message)
        }
    }

    useEffect(() => {
        setLoading(false)
    }, []);

    
    // For motion
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return (
        <SettingContainer>
            {loading ? <Center><Loader/></Center> :
            <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={item} 
                transition={{duration: 0.25}}
                className="setting"
            >
                <p>Настройки</p>
                <form className="password-change" onSubmit={handleSubmit(passwordChangeSubmit)}>
                    <div className="form-group">
                        <label htmlFor="">Старый пароль</label>
                        <input type="password" {...register('old_password')} placeholder="Введите старый пароль" minLength="6" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Новый пароль</label>
                        <input type="password" {...register('new_password')} placeholder="Придумаете новая пароль" minLength="6" required/>
                    </div>
                    <div className="submit">
                        <input type="submit" value="Сохранить"/>
                    </div>
                </form>
            </motion.div>}
        </SettingContainer>
    )
}

export default Settings