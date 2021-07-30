import React, { useState } from 'react';
import { connect } from 'react-redux';

import passwrodResetImg from '../../assets/images/password-reset.jpg'
import abayst from '../../assets/images/abayst.png'
import icon from '../../assets/images/icon64.png';

import { verify } from '../../actions/auth';
import { motion } from "framer-motion"
import { useTranslation } from 'react-i18next';
import { Link, Redirect } from 'react-router-dom';



const Activate = ({ verify, match }) => {
    const [verified, setVerified] = useState(false);
    const { t } = useTranslation()

    const verify_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token);
        setVerified(true);
    };

    if (verified) {
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
                        href="https://abaystreet.com/"><img src={icon} alt="abay" /></motion.a>
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
                    <h1>{t('accounts.activation.form.title')}</h1>
                    <form action="" onSubmit={e => verify_account(e)}>
                        <button type="submit">{t('accounts.activation.form.button')}</button>
                    </form>
                    <Link to="/accounts/login">{t('accounts.activation.backLink')}</Link>
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

export default connect(null, { verify })(Activate);