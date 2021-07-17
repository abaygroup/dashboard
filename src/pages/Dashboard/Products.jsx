import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from "framer-motion";

import Loader from '../../components/Loader';
import Search from '../../components/Search';


import picture from '../../assets/images/picture.jpg';
import { LOCAL_URL } from '../../actions/types';

const ProductsContainer = styled.div`
    display: flex;
    align-items: flex-start;
    width: 1280px;
    margin: 0 auto;
    transform: translateY(-35px);

    .product-list {
        width: 70%;
        display: flex;
        flex-direction: column;
        padding-right: 20px;

        .product {
            display: flex;
            justify-content: space-between;
            padding: 20px;
            border-radius: 5px;
            margin: 5px 0;
            background-color: ${({theme}) => theme.background};
            border: 1px solid ${({theme}) => theme.borderColor};
            box-shadow: 0 5px 10px rgb(0 0 0 / 12%);

            .title {
                width: 70%;
            
                .header {
                    border-bottom: 1px solid ${({theme}) => theme.borderColor};
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 5px;

                    h4 {
                        padding-bottom: 5px;
                        font-weight: 500;
                    }
                    a {
                        font-size: 13px;
                        border: 1px solid ${({theme}) => theme.borderColor};
                        border-radius: 5px;
                        padding: 2px 4px;
                        cursor: pointer;
                        transition: all .3s;

                        &:hover {
                            border: 1px solid ${({theme}) => theme.color};
                        }
                    }
                }


                p {
                    padding-top: 5px;
                    -webkit-line-clamp: 3; 
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    font-size: 14px;
                    overflow: hidden;
                }

                hr {
                    height: 0;
                    border: none;
                    margin-top: 5px;
                    border-top: 1px solid ${({theme}) => theme.borderColor};
                }

                .owner {
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    
                    small {
                        padding: 0 10px;
                        display: flex;
                        align-items: center;

                        img, strong {
                            margin: 0 2px;
                        }
                    }
                    .deleteBtn, .editBtn {
                        border: 1px solid ${({theme}) => theme.borderColor};
                        border-radius: 5px;
                        padding: 2px 5px;
                        margin: 0 5px;
                        cursor: pointer;
                        transition: all .3s;

                        &:hover {
                            border: 1px solid ${({theme}) => theme.color};
                        }
                    }
                }
            }

            .image {
                img {
                    border-radius: 5px;
                }
            }
        }
    }
    .filter {
        width: 20%;
        paddin-left: 20px;

        h4 {
            font-size: 14px;
            font-weight: 600;
            padding-bottom: 10px;
        }  

        form {
            background: ${({theme}) => theme.background};
            border: 1px solid ${({theme}) => theme.borderColor};
            padding: 20px;
            border-radius: 5px;
            .form-group {
                display: flex;
                justify-content: space-between;
                padding-bottom: 5px;
                padding-left: 5px;
                padding-right: 5px;
                align-items: center;
                border-bottom: 1px solid ${({theme}) => theme.borderColor};

    
                label {
                    padding: 0 5px;
                    font-size: 14px;
                }
                input {
                    padding: 5px;
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

const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [mainInput, setMainInput] = useState('')


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
                const response = await axios.get(`http://127.0.0.1:8000/products/${mainInput ? `?search=${mainInput}`: ''}`, localStorage.getItem('access') && config);
                if(!cleanupFunction) {
                    setProducts(response.data)
                    setLoading(false)
                }
            } catch (e) {
                console.error(e.message)
            }
        };
        fetchData()
        return () => cleanupFunction = true;
    }, [products, mainInput])

    const deleteProductHandle = async (owner, isbn_code) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            }
            await axios.delete(`${LOCAL_URL}/product/${owner}/${isbn_code}/`, localStorage.getItem('access') && config)
            
        } catch(e) {
            console.log(e.message);
        }
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
        <ProductsContainer>
            <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={item} 
                transition={{duration: 0.25}} 
                className="product-list">
                <Search input={mainInput} setInput={setMainInput} />
                {loading ? <Center><Loader /></Center> : 
                    products.length > 0 ?
                    <React.Fragment>
                        {products.map((product, i) => {
                            const date = new Date(Date.parse(product.timestamp))
                            return (
                                <div className="product" key={i}>
                                    <div className="title">
                                        <div className="header">
                                            <h4>{product.title}</h4>
                                            <Link to={`product/${product.owner.brandname}/${product.isbn_code}`}>Посещать</Link>
                                        </div>
                                        <p>{product.body}</p>
                                        <hr />
                                        <div className="owner">
                                            <small>Дата выпуска <strong>{date.getDate()}.{date.getMonth()}.{date.getFullYear()} {date.getHours()}:{date.getMinutes()}</strong></small> | 
                                            <small>Рассмотрение <strong>{product.view}</strong></small> | 
                                            <small className="deleteBtn" onClick={() => window.confirm('Вы действительно хотите удалить?') && deleteProductHandle(product.owner.brandname, product.isbn_code)}>Удалить</small> | 
                                            <small className="editBtn"><Link to={`/product/${product.owner.brandname}/${product.isbn_code}/edit`}>Изменить</Link></small>
                                        </div>
                                    </div>
                                    <div className="image">
                                        <img src={product.picture ? product.picture : picture} height="120" alt="" />
                                    </div>
                                </div>   
                            )
                        })}
                    </React.Fragment>
                : <small style={{ display: "block", width: "100%", textAlign: "center", marginTop: "50px" }}>Продукты пока нет</small>}
            </motion.div>
            <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={item} 
                transition={{duration: 0.25}} 
                className="filter">
                <h4>Фильтрация продуктов</h4>
                <form action="">
                    <div className="form-group">
                        <label htmlFor="production">В публикаций</label>
                        <input type="checkbox" name="production" id="production"/>
                    </div>
                </form>
                
            </motion.div>
        </ProductsContainer>
    )
}

export default Products