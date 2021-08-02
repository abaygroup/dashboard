import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import picture from '../../assets/images/picture.jpg';
import { Center, OverviewContainer } from './styles/overview';

import { motion } from "framer-motion";
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/ru';
import 'moment/locale/kk';
import { useTranslation } from 'react-i18next';
import { BACKEND_URL, item } from '../../actions/types';


const Overview = () => {
    const [dashboard, setDashboard] = useState({});
    const [activities, setActivities] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { t } = useTranslation();

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
                const response = await axios.get(BACKEND_URL, localStorage.getItem('access') && config);
                if(!cleanupFunction) {
                    
                    setDashboard(response.data.dashboard)
                    setActivities(response.data.activities)
                    setProducts(response.data.products)
                    setLoading(false)
                }
            } catch (e) {
                console.error(e.message)
            }
        };
        fetchData()
        return () => cleanupFunction = true;
    }, [])

    return (
        <OverviewContainer>
            <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={item} 
                transition={{duration: 0.25}}
                className="products-overview">
                    {loading ? <Center><Loader /></Center> : products.length > 0 ? products.map((product, i) => {
                        const date = new Date(Date.parse(product.timestamp))
                        return (
                            <div className="box" key={i}>
                                <div className="head">
                                    <h3>{product.title}</h3>
                                    <Link to={`product/${product.owner.brandname}/${product.isbn_code}/`}>{t('dashboard.overview.product.visit')}</Link>
                                </div>
                                <div className="actions">
                                    <div className="action">
                                        <span className="status"></span>
                                        <Link to="">{product.title} {t('dashboard.overview.product.integrate')} {dashboard.website}</Link>
                                        <small>Продакшен</small>
                                    </div>
                                    <div className="action">
                                        <span className="status"></span>
                                        <Link to="">{t('dashboard.overview.product.isbn_code')} {product.isbn_code}</Link>
                                        <small>{t('dashboard.overview.product.detail')}</small>
                                    </div>
                                </div>
                                <div className="end">
                                    <Link to="/"><i className="far fa-copyright"></i> {product.owner.brandname} | {product.title}</Link>
                                    <small className="date"><Moment locale={localStorage.getItem('i18nextLng') === 'ru'  ? "ru": "kz"} fromNow>{date}</Moment></small>
                                </div>
                            </div>
                        )
                    }) : <small style={{ display: "block", textAlign: "center", marginTop: "50px" }}>{t('dashboard.overview.product.while')}</small>}
                    
                {products.length > 0 && <Link to="/products" className="view-all">{t('dashboard.overview.product.all_view')}</Link>}
            </motion.div>
            <motion.div
                initial="hidden" 
                animate="visible" 
                variants={item} 
                transition={{duration: 0.25}} 
                className="activity">
                <h4>{t('dashboard.overview.activity.h4')}</h4>
                
                <div className="activities">
                    {activities.length > 0 ? activities.map((activity, i) => {
                        const date = new Date(Date.parse(activity.created_at))
                        return (
                            <div className="box" key={i}>
                                <div className="signal">
                                    <img src={dashboard.logotype || picture} style={{borderRadius: "50%"}} alt="" />
                                    <p>{activity.message}</p>
                                </div>
                                <small style={{ textAlign: "center"}}><Moment locale={localStorage.getItem('i18nextLng') === 'ru'  ? "ru": "kz"} fromNow>{date}</Moment></small>
                            </div>
                        )
                    }) : <small style={{ display: "block", textAlign: "center" }}>{t('dashboard.overview.activity.while')}</small>}
                </div>
                {activities.length > 0 && <Link to="/activities" className="view-all">{t('dashboard.overview.activity.all_view')}</Link>}
            </motion.div>
        </OverviewContainer>
    )
}

export default Overview