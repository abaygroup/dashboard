import React, { useEffect, useState } from 'react';
import Loader from '../../../components/Loader';

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from 'axios';
import { BACKEND_URL, config, item } from '../../../actions/types';
import { Redirect } from 'react-router';
import { Link, useHistory } from 'react-router-dom'; 

import { useTranslation } from 'react-i18next';
import { Center } from '../styles/overview';
import { Container } from '../styles/productComponents';
import { connect } from 'react-redux';
import { createProduct } from '../../../actions/product';

import { DefaultEditor } from 'react-simple-wysiwyg';


const Create = ({createProduct}) => {
    const [loading, setLoading] = useState(true)
    const [disable, setDisable] = useState(false)
    const { register, handleSubmit } = useForm();
    const [dashboard, setDashboard] = useState({});
    const [productImage, setProductImage] = useState(null);
    const [value, setValue] = useState('');

    const { t } = useTranslation();
    let history = useHistory();

    // onChange для изброжение
    const handleChange = (e) => {
		if ([e.target.name].toString() === 'picture') {
            if (e.target.files[0].size < 5000000) {
                setProductImage({
                    picture: e.target.files,
                });
            } else {
                alert('Изброжение слишком большой. Рекомендуемые размер менее 5MB');
                e.target.value = ''
            }
		}
    }

    // Создание продукта
    const handleProduct = (data) => {
        setDisable(true)
        const {title, brand, subcategory, first_price, last_price, body} = data
        createProduct({title, brand, subcategory, productImage, first_price, last_price, body})
        setTimeout(() => {
            setDisable(false)
            history.push(`/products`)
        }, 1500)
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
    
    if(dashboard.branding === false) {
        return <Redirect to='/' />
    }

    document.title = "Создание продукта";

    return (
        <Container>
            {loading ? 
                <Center><Loader /></Center>
            :
            <React.Fragment>
                <h4>{t('dashboard.product.create.h4')}</h4>
                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={item} 
                    transition={{duration: 0.25}}
                    className="create-form">
                    {/* Инструкция товара */}
                    <div className="instruction">
                        <h4>{t('dashboard.product.create.instruction.h4')}</h4>
                        <small>{t('dashboard.product.create.instruction.small')} 
                        <Link to={'/message'}>{t('dashboard.product.create.instruction.link')}</Link>
                            <ul>
                                <li>{t('dashboard.product.create.instruction.ul.first')}</li>
                                <li>{t('dashboard.product.create.instruction.ul.second')}</li>
                                <li>{t('dashboard.product.create.instruction.ul.third')}</li>
                                <li>{t('dashboard.product.create.instruction.ul.fourth')}</li>
                                <li>
                                    {t('dashboard.product.create.instruction.ul.fives')}
                                    <Link to="/docs">{t('dashboard.product.create.instruction.ul.five_l')}</Link>
                                </li>
                                <li>{t('dashboard.product.create.instruction.ul.sixth')}</li>
                            </ul>
                        </small>
                        <small>
                            {t('dashboard.product.create.instruction.last_small.small')}
                            <Link to="/message">{t('dashboard.product.create.instruction.last_small.f_link')}</Link>
                            {t('dashboard.product.create.instruction.last_small.or')}
                            <Link to="/docs">{t('dashboard.product.create.instruction.last_small.l_link')}</Link>
                        </small>
                    </div>
                    {/* Описание товара */}
                    <form action="" className="description" onSubmit={handleSubmit(handleProduct)}>
                        <h4>{t('dashboard.product.create.form.h4')}</h4>
                        <div className="form-group">
                            <input type="file" accept="image/*" {...register("picture")} name="picture" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.product.create.form.title')}</label>
                            <input type="text" {...register("title")} required minLength="3" maxLength="64"/>
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.product.create.form.brand')}</label>
                            <input type="text" defaultValue={dashboard.brand.brandname} {...register("brand")} required minLength="3" maxLength="32"/>
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            {switchCategory(dashboard.branch)}
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.product.create.form.price.title')}</label>
                            <input type="number" {...register("first_price")} placeholder={t('dashboard.product.create.form.price.first_price')} required min="0" max="1000000"/>
                            <input type="number" {...register("last_price")} placeholder={t('dashboard.product.create.form.price.last_price')} required min="0" max="1000000"/>
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.product.create.form.body')}</label>
                            <small className="help-text"></small>
                            <br />
                            <textarea {...register("body")} cols="70" rows="10"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.product.create.form.body')}</label>
                            <DefaultEditor value={value} onChange={(e) => setValue(e.target.value)} />
                        </div>
                        <div className="submit">
                            {disable ? <Loader/> : <input type="submit" value={t('dashboard.product.create.form.submit')} />}
                        </div>
                    </form>
                </motion.div>
            </React.Fragment>}
        </Container>
    )
}

const mapStateToProps = state => ({
    product: state.product.product,
    created: state.product.created,
});

export default connect(mapStateToProps, { createProduct })(Create)