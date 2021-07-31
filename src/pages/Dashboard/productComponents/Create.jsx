import React, { useEffect, useState } from 'react';
import Loader from '../../../components/Loader';

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from 'axios';
import { BACKEND_URL, config, item } from '../../../actions/types';
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

    // onChange для изброжение
    const handleChange = (e) => {
		if ([e.target.name].toString() === 'picture') {
			setProductImage({
				picture: e.target.files,
			});
		}
    }

    // Создание продукта
    const handleProduct = (data) => {
        setDisable(true);
        
        const formData = new FormData()
        formData.append('title', data.title);
        formData.append('brand', data.brand);
        formData.append('subcategory', data.subcategory);
        productImage && formData.append('picture', productImage.picture[0]);
        formData.append('first_price', data.first_price);
        formData.append('last_price', data.last_price);
        formData.append('body', data.body);
        
        axios.post(`${BACKEND_URL}/products/`, formData, localStorage.getItem('access') && config)
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
                const response = await axios.get(BACKEND_URL, localStorage.getItem('access') && config);
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

    
    const switchCategory = branch => {
        switch (branch.slug) {
            case "development":
                return (
                    <select {...register('subcategory')}>
                        <option value="web-development">Веб разработка</option>
                        <option value="game-development">Разработка игры</option>
                        <option value="development-of-mobile-applications">Разработка мобильных приложений</option>
                    </select>
                )
            case "design":
                return (
                    <select {...register('subcategory')}>
                        <option value="web-design">Веб дизайн</option>
                        <option value="game-design">Дизайн игры</option>
                        <option value="3d-animation">3D и анимация</option>
                    </select>
                )
            case "marketing":
                return (
                    <select {...register('subcategory')}>
                        <option value="net-marketing">Интернет-маркетинг</option>
                        <option value="seo">Поисковая оптимизация</option>
                        <option value="smm">SMM</option>
                    </select>
                )
            default:
                return null;
        }
    }

    
    if (created) {
        return <Redirect to={`/product/${product.owner.brandname}/${product.isbn_code}/`}/>
    }
    
    if(dashboard.branding === false) {
        return <Redirect to='/' />
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
                            <input type="file" accept="image/*" {...register("picture")} name="picture" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.create.form.title')}</label>
                            <input type="text" {...register("title")} required minLength="3"/>
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.create.form.brand')}</label>
                            <input type="text" defaultValue={dashboard.brand.brandname} {...register("brand")} required minLength="3"/>
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            {switchCategory(dashboard.branch)}
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