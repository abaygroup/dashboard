import React, { useEffect, useState } from 'react';
import Loader from '../../../components/Loader';

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from 'axios';
import { LOCAL_URL } from '../../../actions/types';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'; 

import { useTranslation } from 'react-i18next';
import { Center } from '../styles/overview';
import { Container } from '../styles/productComponents';



const Create = () => {
    const [loading, setLoading] = useState(true)
    const { register, handleSubmit } = useForm();
    const [product, setProduct] = useState({})
    const [dashboard, setDashboard] = useState({});

    const [created, setCreated] = useState(false)
    const [disable, setDisable] = useState(false)

    const [productImage, setProductImage] = useState(null);

    const { t } = useTranslation();

    const handleChange = (e) => {
		if ([e.target.name].toString() === 'picture') {
			setProductImage({
				picture: e.target.files,
			});
		}
    }

    // Product
    const handleProduct = (data) => {
        setDisable(true);
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        const formData = new FormData()
        formData.append('title', data.title);
        formData.append('brand', data.brand);
        productImage && formData.append('picture', productImage.picture[0]);
        formData.append('first_price', data.first_price);
        formData.append('last_price', data.last_price);
        formData.append('body', data.body);
        
        axios.post(`${LOCAL_URL}/products/`, formData, localStorage.getItem('access') && config)
            .then(response => {
                setProduct(response.data)
                setCreated(true)
                setDisable(false)
            })
            .catch(e => console.error(e.message))
    };

    // UseEffect
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
                    setLoading(false)
                }
            } catch (e) {
                console.error(e.message)
            }
        };
        fetchData()
        return () => cleanupFunction = true;
    }, [])

    if (created) {
        return <Redirect to={`/product/${product.owner.brandname}/${product.isbn_code}/`}/>
    }
    
    if(dashboard.branding === false) {
        return <Redirect to='/' />
    }

    // For motion
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return (
        <Container>
            {loading ? 
                <Center><Loader /></Center>
            :
            <React.Fragment>
                <h4>{t('dashboard.create.h4')}</h4>
                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={item} 
                    transition={{duration: 0.25}}
                    className="create-form">
                    {/* Инструкция товара */}
                    <div className="instruction">
                        <h4>{t('dashboard.create.instruction.h4')}</h4>
                        <small>{t('dashboard.create.instruction.small')} 
                            <Link to={'#'}>{t('dashboard.create.instruction.link')}</Link>
                            <ul>
                                <li>{t('dashboard.create.instruction.ul.first')}</li>
                                <li>{t('dashboard.create.instruction.ul.sixth')}</li>
                                <li>{t('dashboard.create.instruction.ul.second')}</li>
                                <li>{t('dashboard.create.instruction.ul.third')}</li>
                                <li>{t('dashboard.create.instruction.ul.fourth')}</li>
                            </ul>
                            {t('dashboard.create.instruction.ul.fives')}
                        </small>
                    </div>
                    {/* Описание товара */}
                    <form action="" className="description" onSubmit={handleSubmit(handleProduct)}>
                        <h4>{t('dashboard.create.form.h4')}</h4>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.create.form.title')}</label>
                            <input type="text" {...register("title")} required minLength="3"/>
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.create.form.brand')}</label>
                            <input type="text" {...register("brand")} required minLength="3"/>
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <input type="file" accept="image/*" {...register("picture")} name="picture" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.create.form.price.title')}</label>
                            <input type="number" {...register("first_price")} placeholder={t('dashboard.create.form.price.first_price')} required/>
                            <input type="number" {...register("last_price")} placeholder={t('dashboard.create.form.price.last_price')} required/>
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.create.form.body')}</label>
                            <small className="help-text"></small>
                            <br />
                            <textarea {...register("body")} cols="50" rows="10"></textarea>
                        </div>
                        <div className="submit">
                            {disable ? <Loader/> : <input type="submit" value={t('dashboard.create.form.submit')} />}
                        </div>
                    </form>
                </motion.div>
            </React.Fragment>}
        </Container>
    )
}

export default Create