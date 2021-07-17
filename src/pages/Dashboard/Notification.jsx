import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Loader from '../../components/Loader';
import { motion } from "framer-motion";
import { LOCAL_URL } from '../../actions/types';
import axios from 'axios';
import Moment from 'react-moment';


const NotificationContainer = styled.div`
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

const Notification = () => {
    const [loading, setLoading] = useState(true)
    const [notification, setNotification] = useState([])


    useEffect(() => {
        let cleanupFunction = false;
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`
                    }
                }
                const response = await axios.get(`${LOCAL_URL}/notification/`, localStorage.getItem('access') && config);
                if(!cleanupFunction) {
                    setNotification(response.data)
                    setLoading(false);
                }
            } catch (e) {
                console.error(e.message)
            }
        };
        fetchData()
        return () => cleanupFunction = true;
    }, [])

    // For motion
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return (
        <NotificationContainer>
            {loading ? <Center><Loader /></Center> 
            : notification.length > 0 ?
            <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={item} 
                transition={{duration: 0.25}}
                className="notification"
            >
                <p>Уведомление</p>
                {notification.map((n_item, i) => {
                    const date = new Date(Date.parse(n_item.date_send))
                    return (
                        <div className="item" key={i}>
                            <small>Кому: <strong>{n_item.to_send.brandname}</strong></small> 
                            <h4>{n_item.title}</h4>
                            <p>{n_item.body}</p>
                            <small><Moment locale="ru" fromNow>{date}</Moment></small>
                            <hr />
                        </div>
                    )
                })}    
            </motion.div>
            : <small style={{ display: "block", width: "100%", textAlign: "center" }}>Пока уведомление нет</small>}
        </NotificationContainer>
    )
}

export default Notification