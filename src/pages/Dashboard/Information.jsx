import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Loader from './../../components/Loader';
import { motion } from "framer-motion";
import { LOCAL_URL } from '../../actions/types';


const InformationContainer = styled.div`
    width: 1280px;
    margin: 0 auto;
    display: flex;

    h4 {
        width: 100%;
        padding-left: 10px;
        padding-bottom: 10px;
        font-size: 14px;
        border-bottom: 1px solid ${({theme}) => theme.borderColor};
    }

    .profile, .domain {
        padding: 20px;
        width: 50%;
    }

    .form-group {
        padding: 10px 0;

        label {
            display: inline-block;
            font-size: 14px;
            margin: 0 5px;
        }
        input, textarea, select {
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
`;

const Center = styled.div`
    width: 100%;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

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

    const handleChange = (e) => {
		if ([e.target.name].toString() === 'logotype') {
			setLogotypeImg({
				logotype: e.target.files,
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
        logotypeImg && formData.append('logotype', logotypeImg.logotype[0]);
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('gender', data.gender);
        formData.append('city', data.city);
        formData.append('phone', data.phone);
        formData.append('address', data.address);
        formData.append('reserve_email', data.reserve_email);
        formData.append('for_clients', data.for_clients);

        try {
            const response = await axios.put(`${LOCAL_URL}/owner/`, formData, localStorage.getItem('access') && config);
            setProfile(response.data);
            setDisable(false);
            setCreated(true)
        } catch (e) {
            console.error(e.message)
        }
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
                const response = await axios.get(`${LOCAL_URL}/owner/`, localStorage.getItem('access') && config);
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

    // For motion
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return (
        <InformationContainer>
            {loading ? 
                <Center>
                    <Loader />
                </Center>
            :
            <React.Fragment>
                <motion.form 
                    initial="hidden" 
                    animate="visible" 
                    variants={item} 
                    transition={{duration: 0.25}}
                    className="profile" onSubmit={handleSubmit(onSubmit)}>
                    <h4>Ваше Данные</h4>
                    <div className="form-group">
                        <input type="file" {...register("logotype")} onChange={handleChange}/>
                        <small className="help-text"></small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Имя бренда</label>
                        <input type="text" defaultValue={profile.brand.brandname} {...register("brandname")} disabled={true}/>
                        <small className="help-text"></small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Email адрес</label>
                        <input type="email" defaultValue={profile.brand.email} {...register("email")} disabled={true}/>
                        <small className="help-text"></small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Отрасль</label>
                        <input type="text" defaultValue={profile.branch.category_name} {...register("branch")} disabled={true}/>
                        <small className="help-text"></small>
                    </div>
                    <h4>Персональные данные</h4>
                    <div className="form-group">
                        <label htmlFor="">Ваше имя</label>
                        <input type="text" defaultValue={profile.first_name} {...register("first_name")} />
                        <small className="help-text"></small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Ваше фамилия</label>
                        <input type="text" defaultValue={profile.last_name} {...register("last_name")} />
                        <small className="help-text"></small>
                    </div>
                    {genders.find(gender => gender.label === profile.gender) &&
                    <div className="form-group">
                        <label htmlFor="">Пол</label>
                        <select defaultValue={genders.find(gender => gender.label === profile.gender).value} {...register("gender")}>
                            {genders.map((gender, i) => (
                                <option key={i} value={gender.value}>{gender.label}</option>
                            ))}
                        </select>
                        <small className="help-text"></small>
                    </div>
                    }
                    {cities.find(city => city.label === profile.city) && 
                    <div className="form-group">
                        <label htmlFor="">Город</label>
                        <select defaultValue={cities.find(city => city.label === profile.city).value} {...register("city")} id="city">
                            {cities.map((city, i) => (
                                <option key={i} value={city.value}>{city.label}</option>
                            ))}
                        </select>
                        <small className="help-text"></small>
                    </div>}
                    <div className="form-group">
                        <label htmlFor="">Телефон</label>
                        <input type="phone" defaultValue={profile.phone} {...register("phone")} />
                        <small className="help-text"></small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Адрес</label>
                        <textarea cols="40" defaultValue={profile.address} {...register("address")} />
                        <small className="help-text"></small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Резервный email</label>
                        <input type="email" defaultValue={profile.reserve_email} {...register("reserve_email")} />
                        <small className="help-text"></small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Вы открываете это для клиента?</label>
                        <input type="checkbox" defaultChecked={profile.for_clients} {...register("for_clients")} />
                        <small className="help-text"></small>
                    </div>
                    <div className="submit">
                        {disable ? <Loader /> : <input type="submit" value="Сохранить" />}
                    </div>
                </motion.form>

                <motion.form 
                    initial="hidden" 
                    animate="visible" 
                    variants={item} 
                    transition={{duration: 0.25}}
                    action="" className="domain">
                    <h4>Домены</h4>
                    <div className="form-group">
                        <label htmlFor="">Веб сайт</label>
                        <input type="text" defaultValue={profile.website} name="website" disabled={true}/>
                        <small className="help-text"></small>
                    </div>
                </motion.form>
                </React.Fragment>}
        </InformationContainer>
    )
}

export default Information