import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

import Loader from '../../components/Loader';
import Search from '../../components/Search';

import picture from '../../assets/images/picture.jpg';
import { BACKEND_URL, item } from '../../actions/types';

import { useTranslation } from 'react-i18next';
import { ProductsContainer } from './styles/products';
import { Center } from './styles/overview'; 
import { deleteProduct } from '../../actions/product';
import { connect } from 'react-redux';


const Products = ({deleteProduct}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mainInput, setMainInput] = useState('');
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
                const response = await axios.get(`${BACKEND_URL}/products/${mainInput ? `?search=${mainInput}`: ''}`, localStorage.getItem('access') && config);
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

    // Удаление продукта
    const deleteProductHandle = (owner, isbn_code) => {
        deleteProduct({owner, isbn_code})
    }

    document.title = "Продукты | Панель управление";

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
                                            <Link to={`product/${product.owner.brandname}/${product.isbn_code}`}>{t('dashboard.products.product.visit')}</Link>
                                        </div>
                                        <p>{product.body}</p>
                                        <hr />
                                        <div className="owner">
                                            <small>{t('dashboard.products.product.date')}: <strong>{date.getDate()}.{date.getMonth()}.{date.getFullYear()} {date.getHours()}:{date.getMinutes()}</strong></small> | 
                                            <small>{t('dashboard.products.product.view')} <strong>{product.view}</strong></small> | 
                                            <small className="deleteBtn" onClick={() => window.confirm(t('dashboard.products.product.confirm')) && deleteProductHandle(product.owner.brandname, product.isbn_code)}>{t('dashboard.products.product.delete_btn')}</small> | 
                                            <small className="editBtn"><Link to={`/product/${product.owner.brandname}/${product.isbn_code}/edit`}>{t('dashboard.products.product.update_btn')}</Link></small>
                                        </div>
                                    </div>
                                    <div className="image">
                                        <img src={product.picture ? product.picture : picture} alt="" />
                                    </div>
                                </div>   
                            )
                        })}
                    </React.Fragment>
                : <small style={{ display: "block", width: "100%", textAlign: "center", marginTop: "50px" }}>{t('dashboard.products.product.while')}</small>}
            </motion.div>
            <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={item} 
                transition={{duration: 0.25}} 
                className="filter">
                <h4>{t('dashboard.products.filter.h4')}</h4>
                <form action="">
                    <div className="form-group">
                        <label htmlFor="production">{t('dashboard.products.filter.public')}</label>
                        <input type="checkbox" name="production" id="production"/>
                    </div>
                </form>
            </motion.div>
        </ProductsContainer>
    )
}

export default connect(null, { deleteProduct })(Products);