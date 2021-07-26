import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import Moment from 'react-moment';
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { ActivityContainer } from './styles/activities';
import { Center } from './styles/overview';


const Activity = () => {
    const [dashboard, setDashboard] = useState({});
    const [activities, setActivities] = useState([])
    const [loading, setLoading] = useState(true)

    const { t } = useTranslation();

    const deleteAll = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        axios.delete('http://127.0.0.1:8000/activities/', config)
            .then(res => console.log(res.data))
            .catch(e => console.log(e.message))
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
                const response = await axios.get(`http://127.0.0.1:8000/activities/`, localStorage.getItem('access') && config);
                if(!cleanupFunction) {
                    setDashboard(response.data.dashboard)
                    setActivities(response.data.activities);
                    setLoading(false)
                }
            } catch (e) {
                console.error(e.message)
            }
        };
        fetchData()
        return () => cleanupFunction = true;
    }, [activities])

    // For motion
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }
    
    return (
        <ActivityContainer>
            <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={item} 
                transition={{duration: 0.25}}
                className="activities">
                {activities.length > 0 && <small onClick={deleteAll} className="del-all-btn">{t('dashboard.activities.delete_btn')}</small>}
                {loading ? <Center><Loader /></Center> : activities.length > 0 ?
                activities.map((activity, i) => {
                    const date = new Date(Date.parse(activity.created_at))
                    return (
                        <div className="box" key={i}>
                            <div className="signal">
                                <img src={dashboard.logotype} width="60px" style={{borderRadius: "50%"}} alt="" />
                                <p>{activity.message}</p>
                            </div>
                            <small style={{ textAlign: "center"}}><Moment locale={localStorage.getItem('i18nextLng') === 'ru'  ? "ru": "kz"} fromNow>{date}</Moment></small>
                        </div>
                    )
                }) : <small style={{ display: "block", width: "100%", textAlign: "center" }}>{t('dashboard.activities.while')}</small>}
            </motion.div>
            <motion.div
                initial="hidden" 
                animate="visible" 
                variants={item} 
                transition={{duration: 0.25}}>
                <div className="idv">
                    <h3>Обмани меня в цене, но не в товаре.</h3>
                    <p>Требовать благодарности за каждое из своих благодеяний - значит торговать ими.</p>
                </div>
                <div className="idv">
                    <h3>Торгуя честью, не разбогатеешь.</h3>
                    <p>Цена - стоимость плюс разумное вознаграждение за угрызения совести при назначении цены.</p>
                </div>
            </motion.div>
        </ActivityContainer>
    )
}

export default Activity