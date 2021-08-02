import React, { useEffect, useState } from 'react';
import registerImg  from "../../assets/images/register.jpg";
import abayst  from "../../assets/images/abayst.png";
import { Link, Redirect } from 'react-router-dom';
import { motion } from "framer-motion";
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';
import { registerField } from './fields';

import { useTranslation } from 'react-i18next';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Navbar from './Navbar';


const Register = ({isAuthenticated, signup }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [emailList, setEmailList] = useState([])
    const [brandList, setBrandList] = useState([])
    const { t } = useTranslation();


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/accounts/users/', {
            headers: {
            'Content-Type': 'application/json'
            }  
        })
            .then(response => {
                response.data.forEach(user => {
                    setEmailList(emailList => [...emailList, user.email])
                    setBrandList(brandList => [...brandList, user.brandname])
                });
            })
            .catch(error => console.log(error))
    }, [])

    let schema;
    if (localStorage.getItem('i18nextLng') === 'ru') {
        schema = yup.object().shape({
            brandname: yup.string()
                .notOneOf(brandList, 'Имя такое же бренд уже существует')
                .required('Требуется название бренда'),
            email: yup.string()
                .email('Электронная почта должна быть действительной')
                .notOneOf(emailList, 'Электронная почта уже существует')
                .required('Электронная почта требуется'),
            password: yup.string()
                .required('Необходим пароль')
                .min(6, 'Пароль должен состоять из 6 или более символов'),
            re_password: yup.string()
                .required('Необходим подтверждение пароль')
                .min(6).oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
        })
    }
    if (localStorage.getItem('i18nextLng') === 'kz') {
        schema = yup.object().shape({
            brandname: yup.string()
                .notOneOf(brandList, 'Бұндай бренд тіркелген')
                .required('Бренд атауы қажет'),
            email: yup.string()
                .email('Электрондық пошта жарамды болуы керек')
                .notOneOf(emailList, 'Бұл Электрондық пошта тіркелген')
                .required('Электрондық пошта қажет'),
            password: yup.string()
                .required('Құпия сөз қажет')
                .min(6, 'Құпия сөз 6 немесе одан көп таңбадан тұруы керек'),
            re_password: yup.string()
                .required('Құпия сөзді растау қажет')
                .min(6).oneOf([yup.ref('password'), null], 'Құпия сөздер бірдей болуы тиіс'),
        })
    }
    const { register, handleSubmit, formState:{ errors } } = useForm({ resolver: yupResolver(schema) });

    // register
    const onSubmit = data => {
        signup(data.brandname, data.email, data.password, data.re_password);
        setAccountCreated(true);
    };

    if (isAuthenticated) {
        return <Redirect to="/" />
    }
    if (accountCreated) {
        return <Redirect to='/accounts/login' />
    }

    // For motion
    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    }

    document.title = "Регистрация | aBay st.";

    return (
        <div className="accounts-container">
            <div className="accounts-block">
                <Navbar />
                <div className="accounts-center">
                    <div className="logo" style={{ backgroundImage: `url(${abayst})` }}></div>
                    <h1>{t('accounts.register.form.title')}</h1>
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        {registerField.inputs.map((input, key) => {
                            return (
                                <div className="field-group" key={key}>
                                    <input type={input.type} name={input.name} {...register(input.name)} placeholder={input.placeholder()} />
                                    {errors[input.name] ? <small><i className="fas fa-exclamation-circle"></i> {errors[input.name].message}</small>: null}
                                </div>
                            )
                        })}
                        <button type="submit">{t('accounts.register.form.button')}</button>
                    </form>
                    <Link to="/accounts/login">{t('accounts.register.signIn')}</Link>
                </div>
            </div>
            <motion.div
                initial="hidden" 
                animate="visible" 
                variants={variants} 
                transition={{duration: 1}}
                className="accounts-image-block" style={{ backgroundImage: `url(${registerImg})` }}>
            </motion.div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signup })(Register)