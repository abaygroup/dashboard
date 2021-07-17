import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


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
`;

const Navigation = styled.div`
    position: sticky;
    background-color: ${({theme}) => theme.background };
    top: 0;
    border-bottom: 1px solid ${({theme}) => theme.borderColor };
    z-index: 1000;

    nav {
        width: 1024px;
        margin: 0 auto;
        overflow-x: scroll;

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
            
            &:first-child, &:last-child {
                margin: 0;
            }
        }
    }
`;

const Header = (props) => {
    const { logout } = props;
    const color = localStorage.getItem('theme') === 'dark' ? "black": "white";

    return (
        <React.Fragment>
            <HeaderContainer>
                <div className="intro-header">
                    <h3>Панель управления aBay <small>st.</small></h3>
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
                        }}  to="/">Обзор</NavLink>
                    <NavLink activeStyle={{
                        borderBottom: `1px solid ${color}`
                        }} to="/products">Продукты</NavLink>
                    <NavLink activeStyle={{
                        borderBottom: `1px solid ${color}`
                        }} to="/activities">Активности</NavLink>
                    <NavLink activeStyle={{
                        borderBottom: `1px solid ${color}`
                        }} to="/reviews">Уведомление</NavLink>
                    <NavLink activeStyle={{
                        borderBottom: `1px solid ${color}`
                        }} to="/message">Сообщение</NavLink>
                    <NavLink activeStyle={{
                        borderBottom: `1px solid ${color}`
                        }} to="/profile">Данные</NavLink>
                    <NavLink activeStyle={{
                        borderBottom: `1px solid ${color}`
                        }} to="/settings">Настройки</NavLink>
                </nav>
            </Navigation>
        </React.Fragment>
    )
}

export default Header