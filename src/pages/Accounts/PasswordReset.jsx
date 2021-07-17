import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import abayst from '../../assets/images/abayst.png'
import passwrodResetImg from '../../assets/images/password-reset.jpg'
import icon from '../../assets/images/icon64.png';

import { motion } from "framer-motion"
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next'
import { reset_password } from '../../actions/auth';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

    const onSubmit = data => {
        reset_password(data.email);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Redirect to='/' />
    }

    // For motion
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    }
    
    return (
        <div className="login-container">
            <div className="login-block">
            <div className="navbar">
                    <motion.a 
                        initial="hidden" 
                        animate="visible" 
                        variants={item} 
                        transition={{duration: 0.25}}
                        className="icon"
                        href="/"><img src={icon} alt="abay" /></motion.a>
                    <div className="nav-links">
                        <motion.a 
                            initial="hidden" 
                            animate="visible" 
                            variants={item} 
                            transition={{duration: 0.25}}
                            href="/">{t('accounts.navbar.regulations')}</motion.a>
                        <motion.a 
                            initial="hidden" 
                            animate="visible" 
                            variants={item} 
                            transition={{duration: 0.5}}
                            href="/">{t('accounts.navbar.confidentiality')}</motion.a>
                        <motion.a 
                            initial="hidden" 
                            animate="visible" 
                            variants={item} 
                            transition={{duration: 1}}
                            href="/">{t('accounts.navbar.terms')}</motion.a>
                    </div>
                </div>
                <div className="login-center">
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
                className="login-image-block" style={{ backgroundImage: `url(${passwrodResetImg})` }}></motion.div>
        </div>
    )
}


export default connect(null, { reset_password })(PasswordReset);