import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { motion } from "framer-motion";
import { BACKEND_URL, item } from '../../actions/types';
import axios from 'axios';
import Moment from 'react-moment';

import { useTranslation } from 'react-i18next';
import { NotificationContainer } from './styles/notification';
import { Center } from './styles/overview';


const Notification = () => {
    const [loading, setLoading] = useState(true)
    const [notification, setNotification] = useState([])

    const { t } = useTranslation();

    // Подтверждение 
    const checkedMessage = async (id) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            }
            await axios.post(`${BACKEND_URL}/notification/${id}/`, {}, localStorage.getItem('access') && config);
        } catch (e) {
            console.error(e.message)
        }
    }

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
                const response = await axios.get(`${BACKEND_URL}/notification/`, localStorage.getItem('access') && config);
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
    }, [notification])

    document.title = "Уведомление";

    return (
        <NotificationContainer>
            <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={item} 
                transition={{duration: 0.25}}
                className="notification"
            >
                {loading ? <Center><Loader /></Center> 
                : notification.length > 0 ?
                notification.map((n_item, i) => {
                    const date = new Date(Date.parse(n_item.date_send))
                    return (
                        <div className="item" key={i}>
                            <div className="body-ms">
                                <div className="logo-box">
                                    <img src="https://img.icons8.com/fluent/96/000000/topic-push-notification.png" alt=""/>
                                </div>
                                <div className="from-ms">
                                    <small>{t('dashboard.notification.from')} <strong>@{n_item.to_send.brandname}</strong></small>
                                    <h4>{n_item.title}</h4>
                                    <small>{n_item.body}</small>
                                </div>
                            </div>
                            <div className="access">
                                <small><Moment locale={localStorage.getItem('i18nextLng') === 'ru'  ? "ru": "kz"} fromNow>{date}</Moment></small><br />
                                {!n_item.checked && <button onClick={() => checkedMessage(n_item.id)}>{t('dashboard.notification.accept')}</button>}
                            </div>
                        </div>
                    )
                }) 
                : <small style={{ display: "block", width: "100%", textAlign: "center" }}>{t('dashboard.notification.while')}</small>}
            </motion.div>
        </NotificationContainer>
    )
}

export default Notification