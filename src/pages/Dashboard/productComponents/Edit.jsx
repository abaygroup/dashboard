import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import styled from 'styled-components';
import { LOCAL_URL } from '../../../actions/types';
import { motion } from "framer-motion";
import Loader from '../../../components/Loader';
import { useForm } from "react-hook-form";


export const Container = styled.div`
    width: 1280px;
    margin: 0 auto;

    h4 {
        padding-bottom: 10px;
        text-align: center;
        font-size: 14px;
    }

    .edit-form, .create-form {
        margin-top: 20px;
        display: flex;
        justify-content: center;

        .instruction {
            width: 50%;
            margin: 0 20px 20px 20px;
            display: inline-block;
            h4 {
                text-align: left;
                padding-left: 5px;
                padding-bottom: 5px;
                border-bottom: 1px solid ${({theme}) => theme.borderColor};
            }
            small {
                ul {
                    margin: 10px 40px;
                    line-height: 1.5;
                }
            }
        }

        form {
            width: 50%;
            margin: 0 20px 20px 20px;
            h4 {
                text-align: left;
                padding-bottom: 5px;
                
                border-bottom: 1px solid ${({theme}) => theme.borderColor};
            }

            .form-group {
                padding: 10px 0;

                label {
                    display: inline-block;
                    font-size: 14px;
                    margin: 0 5px;
                }
                input, textarea {
                    display: inline-block;
                    margin: 0 5px;
                    padding: 5px 10px;
                    border-radius: 5px;
                    border: 1px solid ${({theme}) => theme.borderColor};
                    color: ${({theme}) => theme.color};
                    background: ${({theme}) => theme.background};
                    font-family: "Inter", sans-serif;
                }
                textarea {
                    resize: vertical;
                }

                span {
                    display: inline-block;
                    padding: 5px 10px;
                    cursor: pointer;
                }
            }
            .submit {
                input {
                    display: inline-block;
                    padding: 5px 15px;
                    border: 1px solid black;
                    color: ${({theme}) => theme.btnColor};
                    transition: all .3s;
                    background: ${({theme}) => theme.btnBackground};
                    border-radius: 5px;
                    font-size: 14px;
                    cursor: pointer;
                    font-weight: 400;
                    font-family: 'Inter', sans-serif;
        
                    &:hover {
                        border: 1px solid ${({theme}) => theme.btnBackground};
                        color: ${({theme}) => theme.btnBackground};
                        background: transparent;
                    }

                    &:disabled {
                        opacity: .5;
                        cursor: inherit;
                    }
                }
            }

            .col-field {
                display: flex;
                align-items: center;
            }
        }

        form.ai {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;

            h4 {
                width: 100%;
            }

            .form-group {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
            }
        }
    }

    .edit-form {
        flex-wrap: wrap;

        form {
            width: auto;
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


const Edit = () => {
    const [product, setProduct] = useState({})
    const [features, setFeatures] = useState([])
    const [loading, setLoading] = useState(true)
    const [ai, setAi] = useState([])
    let params = useParams()
    const [created, setCreated] = useState(false)
    const [disable, setDisable] = useState(false)

    const { register, handleSubmit } = useForm();
    const [productImage, setProductImage] = useState(null);

    const handleChange = (e) => {
		if ([e.target.name].toString() === 'picture') {
			setProductImage({
				picture: e.target.files,
			});
		}
    }

    const onSubmit = async (data) => {
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

        try {
            const response = await axios.put(`${LOCAL_URL}/product/${params.owner}/${params.isbn_code}/`, formData, localStorage.getItem('access') && config);
            setProduct(response.data)
            setCreated(true);
            setDisable(false);
        } catch (e) {
            console.error(e.message)
        }
    }

    // Features
    const [featureData, setFeatureDataData] = useState({label: '', value: ''});
    const { label, value } = featureData;

    const featureChange = e => setFeatureDataData({ ...featureData, [e.target.name]: e.target.value });
    const handleFeature = e => {
        e.preventDefault()
        setDisable(true);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }

        axios.post(`${LOCAL_URL}/product/${params.owner}/${params.isbn_code}/features/`, featureData, localStorage.getItem('access') && config)
        .then(response => {
            setCreated(true);
            setDisable(false);
        })
        .catch(e => console.error(e.message))
    }

    const deleteFeatureHandle = async (owner, isbn_code, id) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            }
            await axios.delete(`${LOCAL_URL}/product/${owner}/${isbn_code}/feature/${id}/`, localStorage.getItem('access') && config)
            
        } catch(e) {
            console.log(e.message);
        }
    }

    // AI image
    const [AImage, setAImage] = useState(null);

    const handleAIChange = (e) => {
		if ([e.target.name].toString() === 'image') {
			setAImage({
				image: e.target.files,
			});
		}
    }
    const data = new FormData();
    AImage && data.append('image', AImage.image[0]);

    const handleAI = e => {
        e.preventDefault();
        setDisable(true);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        axios.post(`${LOCAL_URL}/product/${params.owner}/${params.isbn_code}/ais/`, data, localStorage.getItem('access') && config)
        .then(response => {
            setCreated(true);
            setDisable(false);
        })
        .catch(e => console.error(e.message))
    }
    
    const deleteAI = async (owner, isbn_code, id) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            }
            await axios.delete(`${LOCAL_URL}/product/${owner}/${isbn_code}/ai/${id}/`, localStorage.getItem('access') && config)
            
        } catch(e) {
            console.log(e.message);
        }
    }

    // Videohosting
    
    

    // UseEffect
    useEffect(() => {
        let cleanupFunction = false;
        const fetchData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            }
            try {
                const response = await axios.get(`${LOCAL_URL}/product/${params.owner}/${params.isbn_code}/`, localStorage.getItem('access') && config);
                if(!cleanupFunction) {
                    setProduct(response.data.products);
                    setFeatures(response.data.features);
                    setAi(response.data.ai)
                    setLoading(false)
                }
            } catch (e) {
                console.error(e.message)
            }
        };

        fetchData()
        return () => cleanupFunction = true;   
    }, [params, features, ai]);

    if (created) {
        return <Redirect to={`/product/${product.owner.brandname}/${product.isbn_code}/`}/>
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
                <h4>Редактировать продукт {product.title}</h4>
                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={item} 
                    transition={{duration: 0.25}}
                    className="edit-form">
                    <form action="" className="description" onSubmit={handleSubmit(onSubmit)}>
                        {/* Описание товара */}
                        <h4>Описание товара</h4>
                        <div className="form-group">
                            <label htmlFor="">Название продукта</label>
                            <input type="text" defaultValue={product.title} {...register("title")} name="title" required/>
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Название бренда</label>
                            <input type="text" defaultValue={product.brand} {...register("brand")} required minLength="3"/>
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <input type="file" {...register("picture")}  name="picture" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Цена</label>
                            <input type="number" defaultValue={product.first_price} {...register("first_price")} placeholder="Начальная цена" required/>
                            <input type="number" defaultValue={product.last_price} {...register("last_price")} placeholder="Окончательная цена" required/>
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Описание</label>
                            <small className="help-text"></small>
                            <br />
                            <textarea defaultValue={product.body} {...register("body")} cols="50" rows="10"></textarea>
                        </div>

                        <div className="submit">
                            {disable ? <Loader/> : <input type="submit" value="Сохранить" />}
                        </div>
                    </form>

                    {/* XАРАКТЕРИСТИКИ */}
                    <form action="" className="features" onSubmit={handleFeature}>
                        <h4>Характеристики</h4>
                        {features.length > 0 && features.map((feature, i) => {
                            return (
                                <div className="col-field" key={i}>
                                    <div className="form-group">
                                        <label htmlFor="">Название</label>
                                        <input type="text" value={feature.label} name="label" disabled={true}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Значение</label>
                                        <input type="text" value={feature.value}  name="value" disabled={true}/>
                                    </div>
                                    <div className="form-group">
                                        <span onClick={() => window.confirm("Вы действительно хотите удалить?") && deleteFeatureHandle(product.owner.brandname, product.isbn_code, feature.id)}>&times;</span>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="col-field">
                            <div className="form-group">
                                <label htmlFor="">Название</label>
                                <input type="text" value={label} onChange={featureChange}  name="label" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Значение</label>
                                <input type="text" value={value} onChange={featureChange} name="value" required/>
                            </div>
                        </div>
                        <div className="submit">
                            {disable ? <Loader /> : <input type="submit" value="Создать"/>}
                        </div>
                    </form>

                    {/* Дополнительный иллюстраций */} 
                    <form action="" className="ai" onSubmit={handleAI}>
                        <h4>Дополнительный иллюстраций</h4>
                        {ai.length > 0 && ai.map((img, i) => 
                            (<div className="form-group" key={i}>
                                <img src={img.image} width="32px" alt="" />
                                <input type="file" disabled={true}/>
                                <span onClick={() => window.confirm("Вы действительно хотите удалить?") && deleteAI(product.owner.brandname, product.isbn_code, img.id)}>&times;</span>
                            </div>)
                        )}
                        <div className="col-field">
                            <div className="form-group">
                                <input type="file" accept="image/*" onChange={e => handleAIChange(e)} name="image" required/>
                            </div>
                            <div className="submit">
                                {disable ? <Loader /> : <input type="submit" value="Сохранить"/>}
                            </div>        
                        </div>
                    </form>
                </motion.div>
            </React.Fragment>}
        </Container>
    )
}

export default Edit