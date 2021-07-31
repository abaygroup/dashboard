import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { BACKEND_URL } from '../actions/types';
import axios from 'axios';

const BrandingContainer = styled.div`
    width: 1024px;  
    margin: 0 auto;
    padding: 20px;
    
    a {
        color: blue;
        font-size: 14px;
        font-weight: bold;
        color: rgb(0, 110, 255);
        transition: all .3s;

        &:hover {
            opacity: .7;
        }
    }

    .branding-block {
        display: flex;
        justify-content: center;
        margin: 20px auto;

        .instruction {
            width: 60%;
            margin: 0 20px 20px 20px;
            display: inline-block;
            h4 {
                text-align: left;
                padding-left: 5px;
                padding-bottom: 5px;
                border-bottom: 1px solid silver;
            }
            small {
                ul {
                    margin: 10px 40px;
                    line-height: 1.5;
                }
            }
        }

        .dashboard-form {
            width: 40%;
            margin: 0 20px;

            span.btn {
                margin: 0 10px;
                color: blue;
                font-size: 14px;
                font-weight: bold;
                color: rgb(0, 110, 255);
                transition: all .3s;
                cursor: pointer;
        
                &:hover {
                    opacity: .7;
                }
            }

            form {
                h4 {
                    padding-left: 10px;
                    padding-bottom: 10px;
                    font-size: 14px;
                }
                .form-group {
                    padding: 10px 0;
        
                    .logotype-side {
                        display: flex;
                        align-items: center;
        
                        img {
                            border-radius: 10px;
                            width: 64px;
                            margin: 10px;
                        }
                        .delete-logo-btn {
                            cursor: pointer;
                        }
                    }
               
        
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
                        border: 1px solid silver;
                        background: transparent;
                        font-family: "Inter", sans-serif;
                    }
                    textarea {
                        resize: vertical;
                        display: block;
                    }
                    span {
                        display: inline-block;
                        padding: 5px 10px;
                        cursor: pointer;
                    }
                }
            }
    
            .submit {
                display: block;
                padding: 5px 15px;
                border: 1px solid black;
                color: white;
                transition: all .3s;
                background: black;
                border-radius: 5px;
                font-size: 14px;
                cursor: pointer;
                font-weight: 400;
                font-family: 'Inter', sans-serif;
                margin-bottom: 10px;

                &:hover {
                    border: 1px solid black;
                    color: black;
                    background: transparent;
                }

                &:disabled {
                    opacity: .5;
                    cursor: inherit;
                }
            }
        }
    }


    @media screen and (max-width: 1024px) {
        width: 100%;
    }

    @media screen and (max-width: 780px) {
        .branding-block {
            .instruction {
                display: none;
            }
            .dashboard-form {
                width: 100%;

                form {
                    textarea {
                        width: auto;
                    }
                }
            }
        }
    }
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

const Branding = () => {
    const [count, setCount] = useState(1)
    const { register, handleSubmit } = useForm();
    const [created, setCreated] = useState(false);
    const { t } = useTranslation();

    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append('branch', data.branch)
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('gender', data.gender);
        formData.append('city', data.city);
        formData.append('phone', data.phone);
        formData.append('address', data.address);
        formData.append('reserve_email', data.reserve_email);
        formData.append('for_clients', data.for_clients);

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            }
            const response = await axios.put(`${BACKEND_URL}/owner/`, formData, localStorage.getItem('access') && config);
            console.log(response.data);
            setCreated(true)
        } catch (e) {
            console.error(e.message)
        }
    }

    if (created) {
        return <Redirect to="/" />
    }

    return (
      <BrandingContainer>
          <Link to='/'>Вернуться к назад</Link>
        <div className="branding-block">
            <div className="instruction">
                <h4>{t('dashboard.message.instruction.h4')}</h4>
                <small>
                    {t('dashboard.message.instruction.text.first')}
                    <ul>
                        <li>{t('dashboard.message.instruction.text.second')}</li>
                        <li>{t('dashboard.message.instruction.text.third')}</li>
                        <li>{t('dashboard.message.instruction.text.four')}</li>
                    </ul>
                    {t('dashboard.message.instruction.text.last')}
                </small>
            </div>
            <div className="dashboard-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {count === 1 ? (
                    <React.Fragment>
                        <div className="form-group">
                            <h4>Выберите отрасль</h4>
                            <label htmlFor="">{t('dashboard.information.profile.brand_form.branch')}</label>
                            <select  {...register("branch")}>
                                <option value="development">Разработка</option>
                                <option value="marketing">Маркетинг</option>
                                <option value="design">Дизайн</option>
                            </select>
                            <small className="help-text"></small>
                        </div>
                        <h4>Данные владельца</h4>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.information.profile.profile_form.first_name')}</label>
                            <input type="text" {...register("first_name")} />
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.information.profile.profile_form.last_name')}</label>
                            <input type="text" {...register("last_name")} />
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.information.profile.profile_form.gender')}</label>
                            <select {...register("gender")}>
                                {genders.map((gender, i) => (
                                    <option key={i} value={gender.value}>{gender.label}</option>
                                ))}
                            </select>
                            <small className="help-text"></small>
                        </div>
                    </React.Fragment>
                    ) : null}
                    {count === 2 ? (
                    <React.Fragment>
                        <h4>Контактные данные</h4>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.information.profile.profile_form.city')}</label>
                            <select {...register("city")} id="city">
                                {cities.map((city, i) => (
                                    <option key={i} value={city.value}>{city.label}</option>
                                ))}
                            </select>
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.information.profile.profile_form.phone')}</label>
                            <input type="phone" {...register("phone")} />
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.information.profile.profile_form.address')}</label>
                            <textarea cols="30" rows="5" {...register("address")} />
                            <small className="help-text"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.information.profile.profile_form.reserve_email')}</label>
                            <input type="email" {...register("reserve_email")} />
                            <small className="help-text"></small>
                        </div>
                    </React.Fragment>
                    ) : null}
                    {count === 3 ? (
                    <React.Fragment>
                        <h4>Почти завершено!</h4>
                        <div className="form-group">
                            <label htmlFor="">{t('dashboard.information.profile.profile_form.for_clients')}</label>
                            <input type="checkbox" {...register("for_clients")} />
                            <small className="help-text"></small>
                        </div>
                    </React.Fragment>
                    ) : null}
                    {count === 3 ? <input type="submit" className="submit" value={t('dashboard.information.profile.profile_form.save')} /> : null}
                </form>
                <span className="btn back" onClick={() => setCount(count - 1)} hidden={count < 2}>Назад</span>
                <span className="btn next" onClick={() => setCount(count + 1)} hidden={count > 2}>Далее</span>
            </div>
        </div>
      </BrandingContainer>
    )
}

export default Branding;