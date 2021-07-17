import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loader from '../../components/Loader';
import { motion } from "framer-motion";

const SettingContainer = styled.div`
    display: flex;
    align-items: flex-start;
    width: 1280px;
    margin: 0 auto;
`;

const Center = styled.div`
    width: 100%;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;



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