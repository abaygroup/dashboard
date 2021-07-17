import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import abayst from '../../assets/images/abayst.png';
import loginImg from '../../assets/images/login.jpg';
import icon from '../../assets/images/icon64.png';

import { motion } from "framer-motion";
import { loginField } from './fields';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

import { useTranslation } from 'react-i18next';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

let schema;
if (localStorage.getItem('i18nextLng') === 'ru') {
    schema = yup.object().shape({
        email: yup.string()
            .email('Электронная почта должна быть действительной')
            .required('Электронная почта требуется'),
        password: yup.string()
            .required('Необходим пароль')
            .min(6, 'Пароль должен состоять из 6 или более символов'),
    });
} 
if (localStorage.getItem('i18nextLng') === 'kz') {
    schema = yup.object().shape({
        email: yup.string()
            .email('Электрондық пошта жарамды болуы керек')
            .required('Электрондық пошта қажет'),
        password: yup.string()
            .required('Құпия сөз қажет')
            .min(6, 'Құпия сөз 6 немесе одан көп таңбадан тұруы керек'),
    });
} 


const Login = ({isAuthenticated, login }) => {
    const { register, handleSubmit, formState:{ errors } } = useForm({ resolver: yupResolver(schema) });
    const { t } = useTranslation();

    const onSubmit = data => {
        login(data.email, data.password);
    };

    if (isAuthenticated) {
        return <Redirect to={localStorage.getItem('currentPage')} />
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
                    <div className="logo" style={{ backgroundImage: `url(${abayst})`}}></div>
                    <h1>{t('accounts.login.form.title')}</h1>
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        {loginField.inputs.map((input, key) => {
                            return (
                                <div className="field-group" key={key}>
                                    <input type={input.type} {...register(input.name)} name={input.name} placeholder={input.placeholder()} />
                                    {errors[input.name] ? <small><i className="fas fa-exclamation-circle"></i> {errors[input.name].message}</small>: null}
                                </div>
                            )
                        })}
                        <button type="submit">{t('accounts.login.form.button')}</button>
                    </form>
                    <Link to="/accounts/password/reset">{t('accounts.login.passworReset')}</Link><br />
                    <Link to="/accounts/register">{t('accounts.login.signUp')}</Link>
                </div>
            </div>
            <motion.div
                initial="hidden" 
                animate="visible" 
                variants={variants} 
                transition={{duration: 1}} 
                className="login-image-block" style={{ backgroundImage: `url(${loginImg})` }}></motion.div>
        </div>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);