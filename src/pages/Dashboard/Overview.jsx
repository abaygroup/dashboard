import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';

import { motion } from "framer-motion";
import styled from 'styled-components';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/ru';
import 'moment/locale/kk';

import { useTranslation } from 'react-i18next';


const OverviewContainer = styled.div`
    width: 1024px;
    transform: translateY(-35px);
    margin: 0 auto;
    display: flex;
    align-items: stretch;
    justify-content: space-between;

    .products-overview {
        width: 55%;
        padding-right: 20px;

        .box {
            border-radius: 5px;
            padding: 20px;
            background: ${({theme}) => theme.background};
            box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
            border: 1px solid ${({theme}) => theme.borderColor};
            margin-bottom: 20px;

            .head {
                display: flex;
                justify-content: space-between;
                align-items: center;
                
                a {
                    border-radius: 5px;
                    border: 1px solid silver;
                    padding: 3px 7px;
                    color: ${({theme}) => theme.color};
                    font-size: 13px;
                    transition: all .3s;

                    &:hover {
                        border: 1px solid ${({theme}) => theme.color};
                    }
                }
            }
            .actions {
                margin: 20px 0;

                .action {
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;

                    .status {
                        display: block;
                        width: 10px;
                        height: 10px;
                        background-color: rgb(0, 255, 200);
                        box-shadow: 0 0 5px rgb(0, 255, 200);
                        border-radius: 50%;
                        margin-right: 10px
                    }

                    a {
                        width: 80%;
                        overflow: hidden;
                        font-size: 14px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        transition: all .3s;

                        &:hover {
                            opacity: .7;
                        }
                    }

                    small {
                        display: inline-block;
                        margin-left: 10px;
                        border-radius: 10px;
                        border: 1px solid silver;
                        padding: 2.5px 7px;
                        font-size: 11px;
                    }
                }
            }

            .end {
                border-top: 1px solid ${({theme}) => theme.borderColor};
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-top: 10px;

                a {
                    display: block;
                    font-weight: 500;
                    font-size: 14px;
                    margin-left: 10px;
                }

                .date {
                    color: #666;
                }
            }
        }
    }

    // 
    .activity {
        width: 45%;
        height: 100%;
        padding-left: 20px;

        h4 {
            font-size: 14px;
            font-weight: 600;
            padding-bottom: 10px;
        }  
        
        .activities {
            margin: 20px 0;
            .box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 0;
                border-bottom: 1px solid ${({theme}) => theme.borderColor};

                .signal {
                    display: flex;
                    margin-right: 40px;
                    img {
                        width: 30px;
                        height: 30px;
                        display: inline-block;
                        margin: 0 5px;
                    }
                    p {
                        font-size: 14px;
                        margin: 0 5px;
                    }
                }
                small {
                    color: #666;
                }
            }
        }
    }

    .view-all {
        display: inline-block;
        font-size: 14px;
        font-weight: bolder;
        color: rgb(0, 110, 255);
        transition: all .3s;

        &:hover {
            opacity: .7;
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
                const response = await axios.get(`http://127.0.0.1:8000/`, localStorage.getItem('access') && config);
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

    // For motion
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

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
                                    <img src={dashboard.logotype} style={{borderRadius: "50%"}} alt="" />
                                    <p>{activity.message}</p>
                                </div>
                                <small style={{ textAlign: "center"}}><Moment locale={localStorage.getItem('i18nextLng') === 'ru'  ? "ru": "kz"} fromNow>{date}</Moment></small>
                            </div>
                        )
                    }) : <small style={{ display: "block" }}>{t('dashboard.overview.activity.while')}</small>}
                </div>
                {activities.length > 0 && <Link to="/activities" className="view-all">{t('dashboard.overview.activity.all_view')}</Link>}
            </motion.div>
        </OverviewContainer>
    )
}

export default Overview