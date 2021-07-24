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

    .notification {
        width: 80%;
        margin: 0 auto;

        .item {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid ${({theme}) => theme.borderColor};


            .body-ms {
                display: flex;
                width: 70%;
                
                .logo-box {
                    margin-right: 20px;
                    img {
                        width: 32px;
                    }
                }

            }

            .access {
                
                button {
                    padding: 5px 20px;
                    margin: 5px auto;
                    display: block;
                    cursor: pointer;
                    border: 1px solid ${({theme}) => theme.borderColor};
                    color: ${({theme}) => theme.color};
                    border-radius: 5px;
                    background: transparent;
        
                    &:hover {
                        border: 1px solid ${({theme}) => theme.color};
                    }
                }
             
            }
            
        }
    }

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

    const checkedMessage = async (id) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        try {
            await axios.post(`${LOCAL_URL}/notification/${id}/`, {}, localStorage.getItem('access') && config);
        } catch (e) {
            console.error(e.message)
        }

        console.log(id);
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
    }, [notification])

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
                {notification.map((n_item, i) => {
                    const date = new Date(Date.parse(n_item.date_send))
                    return (
                        <div className="item" key={i}>
                            <div className="body-ms">
                                <div className="logo-box">
                                    <img src="https://img.icons8.com/fluent/96/000000/topic-push-notification.png" alt=""/>
                                </div>
                                <div className="from-ms">
                                    <small>От кого: <strong>@{n_item.to_send.brandname}</strong></small>
                                    <h4>{n_item.title}</h4>
                                    <small>{n_item.body}</small>
                                </div>
                            </div>
                            <div className="access">
                                <small><Moment locale="ru" fromNow>{date}</Moment></small><br />
                                {!n_item.checked && <button onClick={() => checkedMessage(n_item.id)}>Принять</button>}
                            </div>
                        </div>
                    )
                })}    
            </motion.div>
            : <small style={{ display: "block", width: "100%", textAlign: "center" }}>Пока уведомление нет</small>}
        </NotificationContainer>
    )
}

export default Notification