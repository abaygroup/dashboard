import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import { Center } from './styles/overview';
import { SettingContainer } from './styles/settings';
import axios from 'axios';
import { BACKEND_URL, item } from '../../actions/types';
import { useTranslation } from 'react-i18next';

const Settings = () => {
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit } = useForm();
    const { t } = useTranslation();

    const passwordChangeSubmit = async (data) => {
        const formData = JSON.stringify(data)
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            }
            const response = await axios.put(`${BACKEND_URL}/accounts/password-change/`, formData, localStorage.getItem('access') && config);
            console.log(response.data);
        } catch (e) {
            console.error(e.message)
        }
    }

    useEffect(() => setLoading(false), []);

    document.title = "Настройки";

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
                <form className="domain">
                    <h4>{t('dashboard.settings.domain.h4')}</h4>
                    <div className="form-group">
                        <label htmlFor="">{t('dashboard.settings.domain.website')}</label>
                        <input type="text" defaultValue="mywebsite.com" name="website" disabled={true}/>
                        <small className="help-text"></small>
                    </div>
                </form>
                <form className="password-change" onSubmit={handleSubmit(passwordChangeSubmit)}>
                    <h4>{t('dashboard.settings.password-change.h4')}</h4>
                    <div className="form-group">
                        <label htmlFor="">{t('dashboard.settings.password-change.old_password')}</label>
                        <input type="password" {...register('old_password')} placeholder={t('dashboard.settings.password-change.old_placeholder')} minLength="6" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">{t('dashboard.settings.password-change.new_password')}</label>
                        <input type="password" {...register('new_password')} placeholder={t('dashboard.settings.password-change.new_placeholder')} minLength="6" required/>
                    </div>
                    <div className="submit">
                        <input type="submit" value={t('dashboard.settings.password-change.submit')}/>
                    </div>
                </form>
            </motion.div>}
        </SettingContainer>
    )
}

export default Settings