import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { LOCAL_URL } from '../../../actions/types';
import { motion } from "framer-motion";
import Loader from '../../../components/Loader';
import { useForm } from "react-hook-form";

import { useTranslation } from 'react-i18next';
import { Container } from '../styles/productComponents';
import { Center } from '../styles/overview';



const Edit = () => {
    const [product, setProduct] = useState({})
    const [videohosting, setVideohosting] = useState([])
    const [features, setFeatures] = useState([])
    const [loading, setLoading] = useState(true)
    const [ai, setAi] = useState([])
    let params = useParams()
    const [created, setCreated] = useState(false)
    const [disable, setDisable] = useState(false)

    const { register, handleSubmit } = useForm();
    const [productImage, setProductImage] = useState(null);

    const { t } = useTranslation();

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
        formData.append('subcategory', data.subcategory);
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

    const deletePicture = (owner, isbn_code) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        axios.delete(`${LOCAL_URL}/product/${owner}/${isbn_code}/picture/`, localStorage.getItem('access') && config)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => console.log(error.error))
    }

    // Features
    const [featureData, setFeatureData] = useState({label: '', value: ''});
    const { label, value } = featureData;

    const featureChange = e => setFeatureData({ ...featureData, [e.target.name]: e.target.value });
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
    const [videoData, setVideoData] = useState({title: '', frame_url: '', body: '', access: true});
    const { title, frame_url, body, access } = videoData;

    const videoChange = e => setVideoData({ ...videoData, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

    const handleVideo = e => {
        e.preventDefault();
        setDisable(true);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        axios.post(`${LOCAL_URL}/product/${params.owner}/${params.isbn_code}/videohosting/`, videoData, localStorage.getItem('access') && config)
        .then(response => {
            setCreated(true);
            setDisable(false);
        })
        .catch(e => console.error(e.message))
    }

    const deleteVideo = async (owner, isbn_code, id) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            }
            await axios.delete(`${LOCAL_URL}/product/${owner}/${isbn_code}/video/${id}/`, localStorage.getItem('access') && config)
            
        } catch(e) {
            console.log(e.message);
        }
    }
    

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
                    setVideohosting(response.data.videohosting);
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
    }, [params, videohosting, features, ai ]);


    const switchCategory = category => {
        switch (category.slug) {
            case "development":
                return (
                    <select defaultValue={product.subcategory.slug} {...register('subcategory')}>
                        <option value="web-development">Веб разработка</option>
                        <option value="game-development">Разработка игры</option>
                        <option value="development-of-mobile-applications">Разработка мобильных приложений</option>
                    </select>
                )
            case "design":
                return (
                    <select defaultValue={product.subcategory.slug} {...register('subcategory')}>
                        <option value="web-design">Веб дизайн</option>
                        <option value="game-design">Дизайн игры</option>
                        <option value="3d-animation">3D и анимация</option>
                    </select>
                )
            case "marketing":
                return (
                    <select defaultValue={product.subcategory.slug} {...register('subcategory')}>
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
                <h4>{t('dashboard.update.h4')} {product.title}</h4>
                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={item} 
                    transition={{duration: 0.25}}
                    className="edit-form">
                    <div className="main-edit">
                        <form action="" className="description" onSubmit={handleSubmit(onSubmit)}>
                            {/* Описание товара */}
                            <h4>{t('dashboard.update.main_form.h4')}</h4>
                            <div className="form-group">
                                {product.picture &&
                                <div className="picture-side">
                                    <img src={product.picture} alt="" />
                                    <big className="delete-logo-btn" onClick={() => window.confirm(t('dashboard.update.confirm')) && deletePicture(product.owner.brandname, product.isbn_code)} title={t('dashboard.update.title')}>&times;</big>
                                </div>}
                                <input type="file" {...register("picture")} disabled={product.picture && true}  name="picture" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">{t('dashboard.update.main_form.title')}</label>
                                <input type="text" defaultValue={product.title} {...register("title")} name="title" required/>
                                <small className="help-text"></small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">{t('dashboard.update.main_form.brand')}</label>
                                <input type="text" defaultValue={product.brand} {...register("brand")} required minLength="3"/>
                                <small className="help-text"></small>
                            </div>
                            <div className="form-group">
                                {switchCategory(product.category)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="">{t('dashboard.update.main_form.price.title')}</label>
                                <input type="number" defaultValue={product.first_price} {...register("first_price")} placeholder={t('dashboard.update.main_form.price.first_price')} required/>
                                <input type="number" defaultValue={product.last_price} {...register("last_price")} placeholder={t('dashboard.update.main_form.price.last_price')} required/>
                                <small className="help-text"></small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">{t('dashboard.update.main_form.body')}</label>
                                <small className="help-text"></small>
                                <br />
                                <textarea defaultValue={product.body} {...register("body")} cols="50" rows="10"></textarea>
                            </div>

                            <div className="submit">
                                {disable ? <Loader/> : <input type="submit" value={t('dashboard.update.main_form.submit')} />}
                            </div>
                        </form>

                        {/* Xарактеристики */}
                        <form action="" className="features" onSubmit={handleFeature}>
                            <h4>{t('dashboard.update.feature_form.h4')}</h4>
                            {features.length > 0 && features.map((feature, i) => {
                                return (
                                    <div className="col-field" key={i}>
                                        <div className="form-group">
                                            <label htmlFor="">{t('dashboard.update.feature_form.label')}</label>
                                            <input type="text" value={feature.label} name="label" disabled={true}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">{t('dashboard.update.feature_form.value')}</label>
                                            <input type="text" value={feature.value}  name="value" disabled={true}/>
                                        </div>
                                        <div className="form-group">
                                            <span onClick={() => window.confirm(t('dashboard.update.confirm')) && deleteFeatureHandle(product.owner.brandname, product.isbn_code, feature.id)} title={t('dashboard.update.title')}>&times;</span>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="col-field">
                                <div className="form-group">
                                    <label htmlFor="">{t('dashboard.update.feature_form.label')}</label>
                                    <input type="text" value={label} onChange={featureChange}  name="label" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">{t('dashboard.update.feature_form.value')}</label>
                                    <input type="text" value={value} onChange={featureChange} name="value" required/>
                                </div>
                            </div>
                            <div className="submit">
                                {disable ? <Loader /> : <input type="submit" value={t('dashboard.update.feature_form.submit')}/>}
                            </div>
                        </form>

                        {/* Дополнительный иллюстраций */} 
                        <form action="" className="ai" onSubmit={handleAI}>
                            <h4>{t('dashboard.update.ai_form.h4')}</h4>
                            {ai.length > 0 && ai.map((img, i) => 
                                (<div className="form-group" key={i}>
                                    <img src={img.image} width="32px" alt="" />
                                    <input type="file" disabled={true}/>
                                    <span onClick={() => window.confirm(t('dashboard.update.confirm')) && deleteAI(product.owner.brandname, product.isbn_code, img.id)}>&times;</span>
                                </div>)
                            )}
                            <div className="col-field">
                                <div className="form-group">
                                    <input type="file" accept="image/*" onChange={e => handleAIChange(e)} name="image" required/>
                                </div>
                                <div className="submit">
                                    {disable ? <Loader /> : <input type="submit" value={t('dashboard.update.ai_form.submit')}/>}
                                </div>        
                            </div>
                        </form>
                    </div>

                    {/* Видеохостинг */}
                    <form action="" className="videohosting" onSubmit={handleVideo}>
                        <h4>Видеохостинг</h4>
                        {videohosting.length > 0 && videohosting.map((video, i) => {
                            return (
                                <div className="col-field lists" key={i}>
                                    <div className="form-group">
                                        <a href={video.frame_url} rel="noreferrer" target='_blank'>{video.title}</a>
                                    </div> |
                                    <div className="form-group">
                                        {video.access ? <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAJ/ElEQVR4nO2de3BU5RmHn/fbTQImBBJrp1Q7rUUTRmS5ZIPQ0gqYGa91HAutjtYbjvXSTgOi2Nt0O+1MBYUErbWMl1FBx8u0FTtYW5Ho1MtAsjEk0EnA2xQyVgUJEG7J7nn7Ry4mZLPs5lz2lmcmk+zZ77zvm99vz3fOnvOd7whpSkXD8vFR61iZ+nzlijVZVMoUvgYU9v6U9P4GOAzs7/19WGC3iu4UTKtEo20+M2ZnOLjiQGr+k/hIqgvoY8qO24vMkYLZRqhSqAJmAMbBFB+IsskS2UR+/qaWwL37HYw9YlJqwPR3qydELfmBKNcC3wJ8HqWOovKWGtb7jPVC04zaDo/yDsF7AzRkpoc7Lo4i1wlcDozxvIbBHFN4CZUnW4LFryAhy8vk3hmgIRNoPHApSgiY6Vne5NiBysrSzuJnXp8finiR0HUD5tWF/J+P67gBuAdkktv5nEDgPVXuLe0c/6TbRrhqwLmNS4ImysMIQTfzuIXANlG9o6my9i0XczjPlLeXlPry+Q3wE5w9kkkFirAev29Z87T7P3U6uOMGTG2ovkKQx4BSp2OnmH2qLG6prNngZFDHDJhXF/LvH3fg9wp3Oxk3zVDgwejY8XftmBLqciKgI0IFtiw7U/3Wc6Ja6US8DGCr8ekPm2bUfmQ3kG0Dzm1cEjQWLwOn2Y2VYXyuRi9rmVn7jp0gtnaQgXD1AmOxmdwTH6BULHk1EF5ykZ0gIzZgWrj6SlReBsbZKSDDKUTZEKivvnqkAUbUBQXqq69GZD2Zf4jpFBbKNc2VNc8mu2LSBgQal16ApRuBgmTXzXK6RazvbatY889kVkrKgOlbf1ZpGbMZKEqqtNzhiBqtSmbHnLABgS3LzsQX3Qp8aUSl5Q6fGZ/OSvQQNaE+vKLhljxM9GlGxU+E06KWeX7KjlB+Io0TMqCbwvsQ5tirK3cQ1UpztOMPCbU9WYNp4aWXqepLibQdZRCq6JUtwdoX4zWKK+qMxp+eFrX8rWTfiTWv2JeHmRwOrto7XIO4XVAk6l/BqPh2OLUbjdsVDbsFTK+v/rYl8u94bUZJCEuNzh3u0DTmFjCvLuRXkYcYFd8JjFiydl5dyB/zzVgL9xUfvFFhmrt15RRT9xd1XBfrjSEGLHp+kU9U73K/ptxChV/E2gqGGNA66fSrgLM9qSqnkEmfF3UsOnHpYAMUEeUez2rKAEr9RXw135kDQRX5FRoapPmgF9PD1ZeAnOtItiyg1F/EI2W38Xj5HZxRcKrteALnTG3ouHDgskEGKHK97SxZQp/4Z42dyMT8Eh4tu90ZE4wM2hn3H2ZWNCwf303Xx8BY21kynIHiD+Tjrv3cvPNP7Dm+z074Y8anE/sGBPdvARHtvopR8Sn1F/Fo2e1DxAeYmF/CI2W3UeizdS1qjBWR7/e96DdARa+xEzUb6PvkTxr7lWHbvPDZOxyOHreVR4Vr+/4W6O9+9uHd+Py0Y7huZyBr2jfy+P9ecyJdZGwkcuqW2Q8eNADd2n0+o+J7JT6A/7jf9x3o74Ks+U5FzjRSID4AFjIf+gwQWeBo9AwhVeL3sgBAevv//eTYmc8Uiw9gHT+WN8FEtKucUfGH4LL4ACZ/bLTMgJa7mSXdSBPxe1Cr3KghZwxIK/F7KDeo5IQBaSg+olpuUE73LGOKSEfxARA5wyAUe5vVW9JW/B7GGbJ4oG2aiw+9BmTlDRYZID5k6xaQIeJDrwFZRQaJD/ScC+r0IlFVSYBZ49wdbBHvYkof9+/ZkDbiA4cMcMjtLFUlAVac+SP+eNbNzC4ucyVHIhdT1rRvZN0nb7iSf4Qccn0LuGBCj/h+8VFg8nhg0mLHTci0bmcAhwzKQbeiXzAhwMpv9ojfh9MmZLD4AIcMQrsbkQt9Bfz66wsHid9HgcljzaSbbO8TMrDPH4zqHoNomxuxD0ePc+uutRyIHIn5/hiTb2ufkKF9/iBUpM2IhSsGALQeaeeWXQ8Pa8JIu6MM73YG0mZAXDMAnDchi8QHMW1mTDTSSs88OK7hlAlZJT5YXUd9O82W2Q8eBFrczmbXhCwTH2Bb29yVh3pORahu9iLjSE3IQvEBeQ36xwWZOq/SJmtCdooPqtRBrwF5kvcGEPUqeeuRdm7btZaD0aMx3+/7nnBhyfTMPs4fnsgp0e43YcBwlED90jcQ/a6XVUw+5XTWnn0rE/yFJ28cg0z85PdS1xysWQADR0cbfdrrKlqPtPPjXX+mI3I46XUzWHxEdX3f3/0G5Gv+c0DsPsFFRmJCJosPHBM/f+170W9AOLjigMLfU1FRMiZkuPggvDhwuvwT7pKUJz0vqJdETMh48QG19KmBrwcZ0BJc/Q/Q7d6W9AXxTMgK8eE/LcEJg+aUG7wFCKrCvZ5WdQKxTMgG8QFE+d2JD4gYclF+8vvtzwK7PKsqBgNNyBrx4b3yD/e8EGP5UAL1SxYjPOp+WfEp8RexP+LJmAHXUZEbWypWP3Hi8pjDUso/3PME0OR6VSchW8QHGie/v3tdrDeGvTFjWv2SWSq8w+jsuHZJfsImgG2VNVtVZMgmM0rSPBZvIte4n+58leWArfvyc5y9XdGun8drENeAcHDVXoNej8tXzLIUVeXm1vMeivsBPmn/3hSs3ShCrXN15QqyKpHnzSS0g/Xr4eUotp4UkWNsjY4t/mUiDRO+PXX6u9XfsKKyldx8WkYyfBrFqtwRXPPfRBonfIjZNKP2I8twCR4M5s1gDoFenKj4kOQx/vaZNQ2IXgHYm68lO+kSWNgcrG1MZqWkv2Q1V9RuRrkB8PSpo2mOJSLXbQvW/CvZFUf0Lbe5suZZEV0EHBvJ+llGF8o12ypWPzeSlW3NEREIVy9Qlb8J2X2raxw6RayFyT43ZiC2J+mYGr6zQtR6Gfiy3VgZxicq5tKWilVhO0Fsn2hrqVgVtiwJivC23ViZgorUE/XNsSs+OHSmc/us1btLDo4/H5Xfkt07ZwUesMYUz20+7/4PnQjo+DxBgfqllyP6OGB/ltP0Yi/CTc0VNY6OHHH8XH9z5eqXNL/gbOABsmNrUIR1PhM5x2nxweWZsqaG76wAfTiDH3PbZFlyx/ZZq13bv7l6taulYlV48vu754jqYlJ8oT9JdqrIjeUf7Am6KT54OVechkyg8cClKCFgpmd5k0K3o+a+0s7iZ16fH4p4kdH7yfoUmdpQfZHA9YhcTurnqz6KsEEtfaolWPsK4u3Fp5TOlljRsHx8t3YtVOFagblAzAfduEBE4U2jus4vBX8JB1cc8CjvENJmusrAtmWF2hWdY4QqhSpgBs7uoz4QZZMlssnns14dOEA2laSNASdS/ubd4/JO6S4XizKQyaDlRjhDlSJ65jiawBdzHXUCHUCnCJ1q6W4VsxO0FTFtXUd9O9vmrkzL6xj/B39lKL+/5KknAAAAAElFTkSuQmCC" alt=""/> 
                                        : <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PHBhdGggZD0iTTg2LDE3MmMtNDcuNDk2NDksMCAtODYsLTM4LjUwMzUxIC04NiwtODZ2MGMwLC00Ny40OTY0OSAzOC41MDM1MSwtODYgODYsLTg2djBjNDcuNDk2NDksMCA4NiwzOC41MDM1MSA4Niw4NnYwYzAsNDcuNDk2NDkgLTM4LjUwMzUxLDg2IC04Niw4NnoiIGZpbGw9IiNlNzQ2M2MiPjwvcGF0aD48ZyBmaWxsPSIjZmZmZmZmIj48cGF0aCBkPSJNNDYuNzY0NjUsNDMuNTAwOTVsLTMuMjYzNywzLjI2MzdsMzkuMjM1MzUsMzkuMjM1MzVsLTM5LjIzNTM1LDM5LjIzNTM1bDMuMjYzNywzLjI2MzdsMzkuMjM1MzUsLTM5LjIzNTM1bDM5LjIzNTM1LDM5LjIzNTM1bDMuMjYzNywtMy4yNjM3bC0zOS4yMzUzNSwtMzkuMjM1MzVsMzkuMjM1MzUsLTM5LjIzNTM1bC0zLjI2MzcsLTMuMjYzN2wtMzkuMjM1MzUsMzkuMjM1MzV6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=" alt=""/>}
                                    </div> |
                                    <div className="form-group">
                                        <span onClick={() => window.confirm("Вы действительно хотите удалить?") && deleteVideo(product.owner.brandname, product.isbn_code, video.id)} title={t('dashboard.update.title')}>&times;</span>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="col-field">
                            <div className="form-group">
                                <label htmlFor="">{t('dashboard.update.videohosting.title')}</label>
                                <input type="text" value={title} onChange={videoChange}  name="title" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">{t('dashboard.update.videohosting.link')}</label>
                                <input type="text" value={frame_url} onChange={videoChange} name="frame_url" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">{t('dashboard.update.videohosting.body')}</label>
                                <textarea value={body} onChange={videoChange} cols="50" rows="5"  name="body"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">{t('dashboard.update.videohosting.access')}</label>
                                <input type="checkbox" checked={access} onChange={videoChange} name="access"/>
                            </div>
                        </div>
                        <div className="submit">
                            {disable ? <Loader /> : <input type="submit" value={t('dashboard.update.videohosting.submit')}/>}
                        </div>
                    </form>
                </motion.div>
            </React.Fragment>}
        </Container>
    )
}

export default Edit