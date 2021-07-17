import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import abayst from '../../assets/images/abayst.png'
import passwrodResetImg from '../../assets/images/password-reset.jpg'
import icon from '../../assets/images/icon64.png';

import { motion } from "framer-motion"
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next'
import { reset_password_confirm } from '../../actions/auth';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

let schema;

if (localStorage.getItem('i18nextLng') === 'ru') {
    schema = yup.object().shape({
        new_password: yup.string()
            .required('Необходим пароль')
            .min(6, 'Пароль должен состоять из 6 или более символов'),
        re_new_password: yup.string()
            .required('Пароль необходимо подтвердить')
            .min(6).oneOf([yup.ref('new_password'), null], 'Пароли должны совпадать'),
    });
}
if (localStorage.getItem('i18nextLng') === 'kz') {
    schema = yup.object().shape({
        new_password: yup.string()
            .required('Құпия сөз қажет')
            .min(6, 'Құпия сөз 6 немесе одан көп таңбадан тұруы керек'),
        re_new_password: yup.string()
            .required('Құпия сөзді растау қажет')
            .min(6).oneOf([yup.ref('new_password'), null], 'Құпия сөздер бірдей болуы тиіс'),
    });
}


const PasswordResetConfirm = ({ match, reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
    const { register, handleSubmit, formState:{ errors } } = useForm({ resolver: yupResolver(schema) });
    const { t } = useTranslation()

    const onSubmit = data => {
        const uid = match.params.uid;
        const token = match.params.token;
        reset_password_confirm(uid, token, data.new_password, data.re_new_password);
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
                        {/* <img src={abayst} alt="logotype" width="300px" /> */}
                    </div>
                    <h1>{t('accounts.password-reset-confirm.form.title')}</h1>
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="field-group">
                            <input type="password" name="new_password" {...register("new_password")} placeholder="Прудимаете пароль" />
                            {errors['new_password'] ? <small><i className="fas fa-exclamation-circle"></i> {errors['new_password'].message}</small>: null}
                        </div>
                        <div className="field-group">
                            <input type="password" name="re_new_password" {...register("re_new_password")} placeholder="Подтвердите пароль" />
                            {errors['re_new_password'] ? <small><i className="fas fa-exclamation-circle"></i> {errors['re_new_password'].message}</small>: null}
                        </div>
                        <button type="submit">{t('accounts.password-reset-confirm.form.button')}</button>
                    </form>
                    <Link to="/accounts/login">{t('accounts.password-reset-confirm.backLink')}</Link>
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


export default connect(null, { reset_password_confirm })(PasswordResetConfirm);