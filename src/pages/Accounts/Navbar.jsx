import React from 'react';
import { useTranslation } from 'react-i18next';
import icon from '../../assets/images/icon64.png';
import { motion } from "framer-motion";

const Navbar = () => {
    const { t } = useTranslation();

    // For motion
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return (
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
    )
}

export default Navbar