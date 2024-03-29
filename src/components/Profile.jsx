import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import picture from '../assets/images/picture.jpg';
import Loader from './Loader';
import { useTranslation } from 'react-i18next';


const ProfileContainer = styled.div`
    background-color: ${({theme}) => theme.background };
    padding: 50px 0 100px 0;
    border-bottom: 1px solid ${({theme}) => theme.borderColor };

    .intro-profile {
        width: 1024px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        .brand {
            display: flex;

            .avatar {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                overflow: hidden;
                border: 1px solid ${({theme}) => theme.borderColor };
                box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
                margin: 0 10px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .title {
                margin: 0 10px;

                h1 {
                    font-size: 36px;
                    font-weight: 600;
                }

                span {
                    margin-top: 15px;
                    display: block;
                    font-size: 12px;
                    color: #666;
                    text-transform: uppercase;

                }
                a {
                    font-size: 15px;
                    display: inline-block;
                    margin: 5px 0;
                    font-weight: 500;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }

            .checked {
                position: relative;

                img {
                    position: absolute;
                    top: 10px;
                    width: 24px;
                    box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
                    border-radius: 50%;
                }
            }
        }

        .create-proj-btn {
            display: inline-block;
            padding: 10px 15px;
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
        }
    }

    // ===================================================

    @media screen and (max-width: 1040px) {
        .intro-profile {
            width: 100%;
            justify-content: space-around;
    
            .brand {
                display: flex;
    
                .avatar {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 1px solid ${({theme}) => theme.borderColor };
                    box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
                    margin: 0 10px;
    
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .title {
                    margin: 0 10px;
    
                    h1 {
                        font-size: 36px;
                        font-weight: 600;
                    }
    
                    span {
                        margin-top: 15px;
                        display: block;
                        font-size: 12px;
                        color: #666;
                        text-transform: uppercase;
    
                    }
                    a {
                        font-size: 15px;
                        display: inline-block;
                        margin: 5px 0;
                        font-weight: 500;
    
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
            }
    
            .create-proj-btn {
                display: inline-block;
                padding: 10px 15px;
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
            }
        }
    }

    @media screen and (max-width: 720px) {
        padding: 30px 0 80px 0;
        
        .intro-profile {
            width: 100%;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
    
            .brand {
                display: flex;
    
                .avatar {
                    width: 90px;
                    height: 90px;
                    margin: 10px;
                }
                .title {
                    margin: 10px;
                    
                    h1 {
                        font-size: 30px;
                    }
                    span {
                        margin-top: 5px;
                        font-size: 12px;
                    }
                }
                .checked {
                    img {
                        top: 18px;
                        left: -30px;
                    }
                }
            }
        }
    }
`;

const Profile = ({dashboard, brand}) => {
    const { t } = useTranslation();

    return (
        <ProfileContainer>
            <div className="intro-profile">
                <div className="brand">
                    <div className="avatar">
                        <img src={dashboard.logotype ? dashboard.logotype : picture} alt=""/>
                    </div>
                    <div className="title">
                        <h1>{brand.brandname ? brand.brandname : <Loader />}</h1>
                        <span>{t('dashboard.profile.integration')}</span>
                        {dashboard.website ?
                            <a href="/"><i className="fas fa-globe"></i> {dashboard.website}</a>
                        : <small>{t('dashboard.profile.undefined')}</small>}
                    </div>
                    {dashboard.branding &&
                        <div className="checked">
                            <img src="https://img.icons8.com/fluent/48/000000/verified-badge.png" alt="" />
                        </div>
                    }
                </div>
                
                {dashboard.branding && <Link to="/product/create" className="create-proj-btn">{t('dashboard.profile.importing')}</Link>}
            </div>
        </ProfileContainer>
    )
}

export default Profile