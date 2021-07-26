import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { motion } from "framer-motion";

import { Center } from './styles/overview';
import { SettingContainer } from './styles/settings';

const Settings = () => {
    const [loading, setLoading] = useState(true);

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
            </motion.div>}
        </SettingContainer>
    )
}

export default Settings