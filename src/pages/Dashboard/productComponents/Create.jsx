import React, { useEffect, useState } from 'react';
import Loader from '../../../components/Loader';
import { Container } from './Edit';
import styled from 'styled-components';

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from 'axios';
import { LOCAL_URL } from '../../../actions/types';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'; 

const Center = styled.div`
    width: 100%;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Create = () => {
    const [loading, setLoading] = useState(true)
    const { register, handleSubmit } = useForm();
    const [product, setProduct] = useState({})
    const [dashboard, setDashboard] = useState({});

    const [created, setCreated] = useState(false)
    const [disable, setDisable] = useState(false)

    const [productImage, setProductImage] = useState(null);

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
                <Center>
                    <Loader />
                </Center>
            :
            <React.Fragment>
                <h4>Импортировать новый продукт</h4>
                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={item} 
                    transition={{duration: 0.25}}
                    className="create-form">
                    {/* Инструкция товара */}
                    <div className="instruction">
                        <h4>Инструкция по импорту товара</h4>
                        <small>
                            Вы можете импортировать товар по выбранной вами категории. 
                            Т. е. какое направление выбрал бренд, работа ведется по той же категории. 
                            Если выбранная категория неверна, <Link to={'#'}>напишите здесь</Link>

                            <ul>
                                <li>Обязательно нужно написать название товара</li>
                                <li>Для наглядности на товар нужно поставить рисунок. Но это не имеет значения. 
                                    Рисунок лучше нарисовать в максимально квадратичном формате. Например 400x400
                                </li>
                                <li>
                                    Обязательно нужно написать цену. Цена указана в двух видах. 
                                    Первая начальная цена, верхняя цена товара. 
                                    И последняя цена это последняя цена после торговли через клиента.
                                </li>
                                <li>
                                    Описание товара у вас очень важное поле. А нам не важно :). 
                                    Это поле можно оставить пустым. Но мы рекомендуем написать 
                                    описание продукта, максимально используя это поле. Потому 
                                    что продукт с четко прописанным описанием торгуется быстро.
                                </li>
                            </ul>

                            После импорта товара с подробной справкой отправляет товар на главную страницу. 
                            Там же даются формы для нанесения дополнительных рисунков на товар и выдачи 
                            дополнительной характеристики.
                        </small>
                    </div>
                    {/* Описание товара */}
                    <form action="" className="description" onSubmit={handleSubmit(handleProduct)}>
                        <h4>Описание товара</h4>
                        <div className="form-group">
                            <label htmlFor="">Название продукта</label>
                            <input type="text" {...register("title")} required minLength="3"/>
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Название бренда</label>
                            <input type="text" {...register("brand")} required minLength="3"/>
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <input type="file" accept="image/*" {...register("picture")} name="picture" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Цена</label>
                            <input type="number" {...register("first_price")} placeholder="Начальная цена" required/>
                            <input type="number" {...register("last_price")} placeholder="Окончательная цена" required/>
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Описание</label>
                            <small className="help-text"></small>
                            <br />
                            <textarea {...register("body")} cols="50" rows="10"></textarea>
                        </div>
                        <div className="submit">
                            {disable ? <Loader/> : <input type="submit" value="Создать" />}
                        </div>
                    </form>
                </motion.div>
            </React.Fragment>}
        </Container>
    )
}

export default Create