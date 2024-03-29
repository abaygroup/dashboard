import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { BACKEND_URL } from '../actions/types';



const HeaderContainer = styled.div`
    width: 100%;
    background-color: ${({theme}) => theme.background };
    padding-bottom: 10px;

    .intro-header {
        width: 1024px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;

        h3 {
            font-weight: 500;
            font-size: 16px;
        }

        .authorization {
            display: flex;

            a {
                font-size: 14px;
                color: ${({theme}) => theme.color };
                display: flex;
                align-items: center;
                padding: 0 7px;
                transition: all .3s;

                &:hover {
                    opacity: .7;
                }
            }
        }
    }

    // ===================================================
    
    @media screen and (max-width: 1040px) {
        .intro-header {
            width: 100%;
            justify-content: space-around;
        }
    }
`;

const Navigation = styled.div`
    position: sticky;
    background-color: ${({theme}) => theme.background };
    top: 0; left: 0;
    border-bottom: 1px solid ${({theme}) => theme.borderColor };
    z-index: 1000;

    nav {
        width: 1024px;
        margin: 0 auto;

        ::-webkit-scrollbar {
            height: 0;
        }

        a {
            padding: 10px;
            font-size: 14px;
            color: ${({theme}) => theme.color };
            display: inline-block;
            border-bottom: 1px solid ${({theme}) => theme.activeBar };
            transition: all .3s;
            position: relative;
            
            span {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background: #d40000d1;
                color: white;
                padding: 2px;
                margin-right: 5px;
                font-size: 12px;
                box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
            }

            &:first-child, &:last-child {
                margin: 0;
            }
        }
    }

    // ===================================================

    @media screen and (max-width: 1040px) {
        nav {
            width: 100%;
            padding: 0 40px;
        }
    }

    @media screen and (max-width: 720px) {
        nav {
            width: 100%;
            padding: 0;
            overflow: auto;
            white-space: nowrap;
        }
    }
`;

const Header = (props) => {
    const { logout } = props;
    const color = localStorage.getItem('theme') === 'dark' ? "black": "white";
    const [count, setCount] = useState({});
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
                const response = await axios.get(`${BACKEND_URL}/notification/count/`, localStorage.getItem('access') && config);
                if(!cleanupFunction) {
                    setCount(response.data);
                }
            } catch (e) {
                console.error(e.message)
            }
        };
        fetchData()
        return () => cleanupFunction = true;
    }, [count])

    return (
        <React.Fragment>
            <HeaderContainer>
                <div className="intro-header">
                    <h3>{t('dashboard.header.h3')} aBay <small>st.</small></h3>
                    <div className="authorization">
                        <NavLink to="#" onClick={e => props.handleToggleTheme(e)}>
                            {props.theme === 'dark' ? <img src="https://img.icons8.com/ios/96/000000/crescent-moon.png" title="Ночь" width="17" alt=""/>
                            : <img src="https://img.icons8.com/ios/100/ffffff/sun--v3.png" width="20" alt="" title="День" />}
                        </NavLink> |
                        <NavLink to="/help" title="Помощь">{props.theme === 'dark' ? <img src="https://img.icons8.com/ios/96/000000/help.png" width="18" alt=""/> : <img src="https://img.icons8.com/ios/100/ffffff/help.png" width="18" alt="" />}</NavLink>
                        <NavLink to="#" title="Выйти" onClick={logout}>{props.theme === 'dark' ? <img src="https://img.icons8.com/ios/96/000000/exit.png" width="16" alt=""/> : <img src="https://img.icons8.com/ios/100/ffffff/exit.png" width="16" alt="" />}</NavLink>
                    </div>
                </div>
            </HeaderContainer>
            <Navigation>
                <nav>
                    <NavLink exact activeStyle={{
                        borderBottom: `1px solid ${color}`
                        }}  to="/">{t('dashboard.header.overview')}</NavLink>
                    <NavLink activeStyle={{
                        borderBottom: `1px solid ${color}`
                        }} to="/products">{t('dashboard.header.products')}</NavLink>
                    <NavLink activeStyle={{
                        borderBottom: `1px solid ${color}`
                        }} to="/activities">{t('dashboard.header.activities')}</NavLink>
                    <NavLink activeStyle={{
                        borderBottom: `1px solid ${color}`
                        }} to="/reviews">{count.nochecked_count > 0 && <span>{count.nochecked_count} </span>} {t('dashboard.header.notification')}</NavLink>
                    <NavLink activeStyle={{
                        borderBottom: `1px solid ${color}`
                        }} to="/message">{t('dashboard.header.message')}</NavLink>
                    <NavLink activeStyle={{
                        borderBottom: `1px solid ${color}`
                        }} to="/profile">{t('dashboard.header.information')}</NavLink>
                    <NavLink activeStyle={{
                        borderBottom: `1px solid ${color}`
                        }} to="/settings">{t('dashboard.header.settings')}</NavLink>
                </nav>
            </Navigation>
        </React.Fragment>
    )
}

export default Header