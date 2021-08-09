import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { motion } from "framer-motion";
import { BACKEND_URL, config, item } from '../../../actions/types';
import Loader from '../../../components/Loader';
import picture from '../../../assets/images/picture.jpg';
import Moment from 'react-moment';
import Linkify from 'react-linkify';

import { useTranslation } from 'react-i18next';
import { ProductDetail } from '../styles/productComponents';
import { Center } from '../styles/overview';
import { connect } from 'react-redux';
import { deleteProduct } from '../../../actions/product';



const Detail = ({deleteProduct}) => {
    const [product, setProduct] = useState({});
    const [observersCount, setObserversCount] = useState(null);
    const [videohosting, setVideohosting] = useState([])
    const [features, setFeatures] = useState([])
    const [loading, setLoading] = useState(true)
    const [ai, setAi] = useState([])
    let params = useParams()
    const imageRef = useRef(null)
    let history = useHistory();

    const { t } = useTranslation();

    // Удаление продукта
    const deleteProductHandle = (owner, isbn_code) => {
        deleteProduct({owner, isbn_code});
        alert(`${product.title} удалено!`)
        history.push('/products')
    }

    const toggleVideoBox = e => {
        const body = e.target.parentElement.nextSibling;
        body.classList.toggle('expand');
    }

    useEffect(() => {
        let cleanupFunction = false;
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/product/${params.owner}/${params.isbn_code}/`, localStorage.getItem('access') && config);
                if(!cleanupFunction) {
                    setProduct(response.data.products);
                    setObserversCount(response.data.observers_count);
                    setFeatures(response.data.features);
                    setVideohosting(response.data.videohosting);
                    setAi(response.data.ai)
                    setLoading(false)
                }
            } catch (e) {
                console.error(e.message)
            }
        };

        fetchData()
        return () => cleanupFunction = true;   
    }, [params])


    const changeImg = (e) => {
        imageRef.current.src = e.target.src;
    }

    document.title = product.title || "...";

    return (
        <ProductDetail>
            <Link className="close" to="/products">{t('dashboard.product.detail.close')}</Link>
            {loading ? 
                <Center><Loader/></Center>
            : 
            <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={item} 
                transition={{duration: 0.25}}
                className="product-block">
                <div className="product">
                    <div className="images">
                        <div className="main-image">
                            <img src={product.picture ? product.picture : picture} ref={imageRef} alt="" />
                        </div>
                        {ai.length > 0 && 
                        <div className="ai-images">
                            <img src={product.picture} onClick={e => changeImg(e)} alt="" />
                            {ai.map((image, i) => {
                                return <img key={i} onClick={e => changeImg(e)}  src={image.image ? image.image : picture} alt="" />
                            })}
                        </div>}
                    </div>
                    
                    <div className="product-info">
                        <h3>{product.title} </h3>
                        <h1><small>{product.last_price}тг</small> - {product.first_price}тг</h1>
                        <small className="subcategory"><b>Категория:</b> {product.subcategory.name}</small>
                        <small className="observers-count"><b>Количество людей:</b> {observersCount}</small>
                        <small className="production"><b>Продакшн:</b> {product.production ? "Да" : "Нет"}</small>
                        <Linkify><p>{product.body}</p></Linkify>
                        <div className="buttons">
                            <Link to={`/product/${product.owner.brandname}/${product.isbn_code}/edit`}>{t('dashboard.product.detail.buttons.update')}</Link>
                            <span onClick={() => window.confirm(t('dashboard.product.detail.confirm')) && deleteProductHandle(product.owner.brandname, product.isbn_code)}>{t('dashboard.product.detail.buttons.delete')}</span>
                        </div>
                    </div>
                    <div className="features">
                        <h4>{t('dashboard.product.detail.videohosting.h4')}</h4>
                        {features.length > 0 ? features.map((feature, i) => {
                            return (
                                <span key={i}><strong>{feature.label}:</strong> {feature.value}</span>
                            )
                        }) : <small style={{ display: "block", width: "100%", textAlign: "center", marginTop: "50px" }}>{t('dashboard.product.detail.no_features')}</small>}
                    </div>
                </div>
                <div className="videohosting">
                    {videohosting.length > 0 ? videohosting.map((video, i) => {
                        const date = new Date(Date.parse(video.timestamp))
                        return (
                            <div className="video-box" key={i}>
                                <h4>
                                    <Link to={`/product/${product.owner.brandname}/${product.isbn_code}/video/${video.id}`}>{video.title}</Link>
                                    <small className="collapse" onClick={e => toggleVideoBox(e)}>{t('dashboard.product.detail.videohosting.show')}</small>
                                </h4>
                                <Linkify><small className="body">{video.body}</small></Linkify>
                                <div className="access">
                                    {video.access ? 
                                        <span>
                                            <img src="data:image/png;base64,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" alt=""/>
                                            <small>{t('dashboard.product.detail.videohosting.access')}</small>
                                        </span>
                                        : <span>
                                            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PHBhdGggZD0iTTg2LDE3MmMtNDcuNDk2NDksMCAtODYsLTM4LjUwMzUxIC04NiwtODZ2MGMwLC00Ny40OTY0OSAzOC41MDM1MSwtODYgODYsLTg2djBjNDcuNDk2NDksMCA4NiwzOC41MDM1MSA4Niw4NnYwYzAsNDcuNDk2NDkgLTM4LjUwMzUxLDg2IC04Niw4NnoiIGZpbGw9IiNlNzQ2M2MiPjwvcGF0aD48ZyBmaWxsPSIjZmZmZmZmIj48cGF0aCBkPSJNNDYuNzY0NjUsNDMuNTAwOTVsLTMuMjYzNywzLjI2MzdsMzkuMjM1MzUsMzkuMjM1MzVsLTM5LjIzNTM1LDM5LjIzNTM1bDMuMjYzNywzLjI2MzdsMzkuMjM1MzUsLTM5LjIzNTM1bDM5LjIzNTM1LDM5LjIzNTM1bDMuMjYzNywtMy4yNjM3bC0zOS4yMzUzNSwtMzkuMjM1MzVsMzkuMjM1MzUsLTM5LjIzNTM1bC0zLjI2MzcsLTMuMjYzN2wtMzkuMjM1MzUsMzkuMjM1MzV6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=" alt=""/>
                                            <small>{t('dashboard.product.detail.videohosting.no_access')}</small>
                                        </span>}
                                    <small></small>
                                    <small className="date"><Moment locale={localStorage.getItem('i18nextLng') === 'ru'  ? "ru": "kz"} fromNow>{date}</Moment></small>
                                </div>
                            </div>
                        )
                    }): <small style={{ display: "block", width: "100%", textAlign: "center", marginTop: "50px" }}>{t('dashboard.product.detail.no_features')}</small>}
                </div>
            </motion.div>}
        </ProductDetail>
    )
}

export default connect(null, { deleteProduct })(Detail)