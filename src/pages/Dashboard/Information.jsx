import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Loader from './../../components/Loader';
import { BACKEND_URL, item } from '../../actions/types';

import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { InformationContainer } from './styles/information';
import { Center } from './styles/overview';


const genders = [
    { value: 'NOT_DEFINED', label: 'Не указано' },
    { value: 'MALE', label: 'Мужской' },
    { value: 'FAMALE', label: 'Женский' },
  ];

const cities = [
    {value: 'ALMATY', label: 'Алматы' },
    {value: 'SHYMKENT', label: 'Шымкент' },
    {value: 'NURSULTAN', label: 'Нұр-Сұлтан' }
]

const Information = () => {
    const [profile, setProfile] = useState({});

    const [loading, setLoading] = useState(true);
    const [disable, setDisable] = useState(false);
    const [created, setCreated] = useState(false);
    const { register, handleSubmit } = useForm();

    const [logotypeImg, setLogotypeImg] = useState(null);

    const { t } = useTranslation();

    const handleChange = (e) => {
		if ([e.target.name].toString() === 'logotype') {
			setLogotypeImg({
				logotype: e.target.files,
			});
		}
    }

    // Сохранение профиля
    const onSubmit = async (data) => {
        setDisable(true);

        const formData = new FormData()
        logotypeImg && formData.append('logotype', logotypeImg.logotype[0]);
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('gender', data.gender);
        formData.append('city', data.city);
        formData.append('phone', data.phone);
        formData.append('address', data.address);
        formData.append('reserve_email', data.reserve_email);
        formData.append('for_clients', data.for_clients);
        formData.append('branding', profile.branding);

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            }
            const response = await axios.put(`${BACKEND_URL}/owner/`, formData, localStorage.getItem('access') && config);
            setProfile(response.data);
            setDisable(false);
            setCreated(true)
        } catch (e) {
            console.error(e.message)
        }
    }
    
    // Удаление логотипа
    const deleteLogo = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        axios.delete(`${BACKEND_URL}/owner/logo/`, localStorage.getItem('access') && config)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => console.log(error.error))
    }

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
                const response = await axios.get(`${BACKEND_URL}/owner/`, localStorage.getItem('access') && config);
                if(!cleanupFunction) {
                    setProfile(response.data);
                    setLoading(false);
                }
            } catch (e) {
                console.error(e.message)
            }
        };
        fetchData()
        return () => cleanupFunction = true;
    }, [])

    if (created) {
        return <Redirect to="/" />
    }

    document.title = "Профиль";
    
    return (
        <InformationContainer>
            {loading ? 
                <Center><Loader /></Center>
            :
            <motion.form 
                initial="hidden" 
                animate="visible" 
                variants={item} 
                transition={{duration: 0.25}}
                className="profile-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-row">
                    <div className="row">
                        <h4>{t('dashboard.information.profile.brand_form.h4')}</h4>
                        <div className="form-group">
                            {profile.logotype &&
                            <div className="logotype-side">
                                <img src={profile.logotype} alt="" />
                                <big className="delete-logo-btn" onClick={() => window.confirm(t('dashboard.information.confirm')) && deleteLogo()} title={t('dashboard.information.title')}>&times;</big>
                            </div>}
                            <input type="file" {...register("logotype")} disabled={profile.logotype && true} onChange={handleChange}/>
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.information.profile.brand_form.brandname')}</label>
                            <input type="text" defaultValue={profile.brand.brandname} {...register("brandname")} disabled={true}/>
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.information.profile.brand_form.email')}</label>
                            <input type="email" defaultValue={profile.brand.email} {...register("email")} disabled={true}/>
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.information.profile.brand_form.branch')}</label>
                            <input type="text" defaultValue={profile.branch.name} {...register("branch")} disabled={true}/>
                            <small className="help-text"></small>
                        </div>
                        <div className="submit">
                            {disable ? <Loader /> : <input type="submit" value={t('dashboard.information.profile.profile_form.save')} />}
                        </div>
                    </div>
                    <div className="row">
                        <h4>{t('dashboard.information.profile.profile_form.h4')}</h4>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.information.profile.profile_form.first_name')}</label>
                            <input type="text" defaultValue={profile.first_name} {...register("first_name")} />
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.information.profile.profile_form.last_name')}</label>
                            <input type="text" defaultValue={profile.last_name} {...register("last_name")} />
                            <small className="help-text"></small>
                        </div>
                        {genders.find(gender => gender.label === profile.gender) &&
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.information.profile.profile_form.gender')}</label>
                            <select defaultValue={genders.find(gender => gender.label === profile.gender).value} {...register("gender")}>
                                {genders.map((gender, i) => (
                                    <option key={i} value={gender.value}>{gender.label}</option>
                                ))}
                            </select>
                            <small className="help-text"></small>
                        </div>}
                        {cities.find(city => city.label === profile.city) && 
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.information.profile.profile_form.city')}</label>
                            <select defaultValue={cities.find(city => city.label === profile.city).value} {...register("city")} id="city">
                                {cities.map((city, i) => (
                                    <option key={i} value={city.value}>{city.label}</option>
                                ))}
                            </select>
                            <small className="help-text"></small>
                        </div>}
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.information.profile.profile_form.phone')}</label>
                            <input type="phone" defaultValue={profile.phone} {...register("phone")} />
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.information.profile.profile_form.address')}</label>
                            <textarea cols="40" rows="5" defaultValue={profile.address} {...register("address")} />
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.information.profile.profile_form.reserve_email')}</label>
                            <input type="email" defaultValue={profile.reserve_email} {...register("reserve_email")} />
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.information.profile.profile_form.for_clients')}</label>
                            <input type="checkbox" defaultChecked={profile.for_clients} {...register("for_clients")} />
                            <small className="help-text"></small>
                        </div>
                        <div className="submit">
                            {disable ? <Loader /> : <input type="submit" value={t('dashboard.information.profile.profile_form.save')} />}
                        </div>
                    </div>
                </div>
            </motion.form>}
        </InformationContainer>
    )
}

export default Information