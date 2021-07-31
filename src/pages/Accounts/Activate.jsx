import React, { useState } from 'react';
import { connect } from 'react-redux';

import passwrodResetImg from '../../assets/images/password-reset.jpg'
import abayst from '../../assets/images/abayst.png'

import { verify } from '../../actions/auth';
import { motion } from "framer-motion"
import { useTranslation } from 'react-i18next';
import { Link, Redirect } from 'react-router-dom';
import Navbar from './Navbar';



const Activate = ({ verify, match }) => {
    const [verified, setVerified] = useState(false);
    const { t } = useTranslation()

    // activate 
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
    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    }
    
    return (
        <div className="accounts-container">
            <div className="accounts-block">
                <Navbar />
                <div className="accounts-center">
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
                className="accounts-image-block" style={{ backgroundImage: `url(${passwrodResetImg})` }}></motion.div>
        </div>
    )
}

export default connect(null, { verify })(Activate);