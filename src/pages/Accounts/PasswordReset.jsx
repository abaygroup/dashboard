import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import abayst from '../../assets/images/abayst.png'
import passwrodResetImg from '../../assets/images/password-reset.jpg'

import { motion } from "framer-motion"
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next'
import { reset_password } from '../../actions/auth';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Navbar from './Navbar';

let schema;

if (localStorage.getItem('i18nextLng') === 'ru') {
    schema = yup.object().shape({
        email: yup.string()
            .email('Электронная почта должна быть действительной')
            .required('Электронная почта требуется'),
    });
}
if (localStorage.getItem('i18nextLng') === 'kz') {
    schema = yup.object().shape({
        email: yup.string()
            .email('Электрондық пошта жарамды болуы керек')
            .required('Электрондық пошта қажет'),
    });
}

const PasswordReset = ({ reset_password }) => {
    const { register, handleSubmit, formState:{ errors } } = useForm({ resolver: yupResolver(schema) });
    const [requestSent, setRequestSent] = useState(false);
    const { t } = useTranslation() 

    // password reset
    const onSubmit = data => {
        reset_password(data.email);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Redirect to='/' />
    }

    // For motion
    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    }

    document.title = "Сброс пароля | aBay st.";
    
    return (
        <div className="accounts-container">
            <div className="accounts-block">
                <Navbar />
                <div className="accounts-center">
                    <div className="logo" style={{ backgroundImage: `url(${abayst})` }}>
                    </div>
                    <h1>{t('accounts.password-reset.form.title')}</h1>
                    <form action="" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="field-group">
                            <input type="email" name="email" {...register("email")}  placeholder="example@gmail.com" />
                            {errors['email'] ? <small><i className="fas fa-exclamation-circle"></i> {errors['email'].message}</small>: null}
                        </div>
                        <small>{t('accounts.password-reset.form.small')}</small>
                        <button type="submit">{t('accounts.password-reset.form.button')}</button>
                    </form>
                    <Link to="/accounts/login">{t('accounts.password-reset.backLink')}</Link>
                </div>
            </div>
            <motion.div
                initial="hidden" 
                animate="visible" 
                variants={variants} 
                transition={{duration: 1}} 
                className="accounts-image-block" style={{ backgroundImage: `url(${passwrodResetImg})` }}></motion.div>
        </div>
    )
}


export default connect(null, { reset_password })(PasswordReset);