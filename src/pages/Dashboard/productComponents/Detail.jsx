import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from "framer-motion";
import { LOCAL_URL } from '../../../actions/types';
import Loader from '../../../components/Loader';
import picture from '../../../assets/images/picture.jpg';


const ProductDetail = styled.div`
    width: 100%;
    padding: 20px;
    position: relative;

    .close {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 14px;
        transition: all .3s;

        &:hover {
            opacity: .7;
        }
    }

    .product-block {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        text-align: center;
        margin: 40px 0px;

        .images {
            display: flex;
            align-items: center;
    
            .main-image {
                width: 100%;
                margin: 0 10px;
    
                img {
                    border-radius: 10px;
                    height: 300px;
                }
            }
    
            .ai-images {
                width: 64px;
                height: 300px;
                overflow-y: auto;
             
                /* width */
                ::-webkit-scrollbar {
                    width: 0;
                }
                img {
                    width: 100%;
                    height: auto;
                    border-radius: 5px;
                    margin: 5px 0;
                    cursor: pointer;
                    box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
                }
            }
        }
    
                
    
        .product-info {
            width: 50%;
            padding: 0 20px;
            
            h3 {
                padding-bottom: 10px;
                border-bottom: 1px solid ${({theme}) => theme.borderColor};
            }
            h1 {
                padding: 10px;
                font-weight: 600;
            }
    
            p {
                font-size: 14px;
            }

            .buttons {
                
                a, span {
                    margin: 20px 5px;
                    display: inline-block;
                    padding: 4px 20px;
                    border-radius: 5px;
                    border: 1px solid ${({theme}) => theme.borderColor};
                    font-size: 13px;
                    cursor: pointer;

                    &:hover {
                        border: 1px solid ${({theme}) => theme.color};
                    }
                }
            }
        }
    
    
        .features {
            width: 90%;
            margin-top: 20px;
    
            h4 {
                font-size: 14px;
                font-weight: 600;
            }
    
            span {
                font-size: 14px;
                padding: 10px 0;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid ${({theme}) => theme.borderColor};
    
                strong { 
                    font-weight: 600;
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

const Detail = () => {
    const [product, setProduct] = useState({})
    const [videohosting, setVideohosting] = useState([])
    const [features, setFeatures] = useState([])
    const [loading, setLoading] = useState(true)
    const [ai, setAi] = useState([])
    let params = useParams()
    const imageRef = useRef(null)

    const deleteProductHandle = async (owner, isbn_code) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            }
            await axios.delete(`${LOCAL_URL}/product/${owner}/${isbn_code}/`, localStorage.getItem('access') && config)
            alert(`${product.title} удалено!`)
        } catch(e) {
            console.log(e.message);
        }
    }

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

    // For motion
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return (
        <ProductDetail>
            <Link className="close" to="/products">Закрыть</Link>
            {loading ? 
                <Center>
                    <Loader/>
                </Center>
            : 
                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={item} 
                    transition={{duration: 0.25}}
                    className="product-block">
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
                        <h3>{product.title}</h3>
                        <h1><small>{product.last_price}тг</small> - {product.first_price}тг</h1>
                        <p>{product.body}</p>
                        
                        <div className="buttons">
                            <Link to={`/product/${product.owner.brandname}/${product.isbn_code}/edit`}>Изменить</Link>
                            <span onClick={() => window.confirm('Вы действительно хотите удалить?') && deleteProductHandle(product.owner.brandname, product.isbn_code)}>Удалить</span>
                        </div>
                    </div>
                    <div className="features">
                        <h4>Характеристики</h4>
                        {features.length > 0 ? features.map((feature, i) => {
                            return (
                                <span key={i}><strong>{feature.label}:</strong> {feature.value}</span>
                            )
                        }) : <small style={{ display: "block", width: "100%", textAlign: "center", marginTop: "50px" }}>Нет характеристики</small>}
                    </div>

                    <div className="videohosting">
                        <h4>Видеохостинг</h4>
                        {videohosting.length > 0 ? videohosting.map((video, i) => {
                            return (
                                <div className="video-box" key={i}>
                                    <iframe  height="auto" src={video.frame_url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    <h4>{video.title}</h4>
                                    <small>{video.body}</small>
                                    <span>{video.timestamp}</span>
                                    <hr />
                                </div>
                            )
                        }) : <small style={{ display: "block", width: "100%", textAlign: "center", marginTop: "50px" }}>Нет видеохостинг</small>}
                    </div>
                </motion.div>
            }
        </ProductDetail>
    )
}

export default Detail