import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import picture from '../assets/images/picture.jpg';


const UserProfileContainer = styled.div`
    .header {
        display: flex;
        justify-content: center;
        padding: 10px;
        border-bottom: 1px solid ${({theme}) => theme.borderColor };

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
    .profile-box {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        margin: 20px 0;

        .logotype {
            box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;
            margin: 10px auto;
            img {
                width: 100%;
            }
        }

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
    }
`;

const UserProfile = (props) => {
    return (
        <UserProfileContainer>
            <div className="header">
                <NavLink to="#" onClick={e => props.handleToggleTheme(e)}>
                    {props.theme === 'dark' ? <img src="https://img.icons8.com/ios/96/000000/crescent-moon.png" title="Ночь" width="17" alt=""/>
                    : <img src="https://img.icons8.com/ios/100/ffffff/sun--v3.png" width="20" alt="" title="День" />}
                </NavLink> |
                <NavLink to="/help" title="Помощь">{props.theme === 'dark' ? <img src="https://img.icons8.com/ios/96/000000/help.png" width="18" alt=""/> : <img src="https://img.icons8.com/ios/100/ffffff/help.png" width="18" alt="" />}</NavLink>
                <NavLink to="#" title="Выйти" onClick={props.logout}>{props.theme === 'dark' ? <img src="https://img.icons8.com/ios/96/000000/exit.png" width="16" alt=""/> : <img src="https://img.icons8.com/ios/100/ffffff/exit.png" width="16" alt="" />}</NavLink>
            </div>
            <div className="profile-box">
                <div className="logotype">
                    <img src={props.dashboard.logotype ? props.dashboard.logotype : picture} alt="" />
                </div>
                <h4>@{props.brand.brandname}</h4>
                <p>{props.brand.email}</p>
                <Link to="/branding">Перейти в панель управление</Link>
            </div>
        </UserProfileContainer>
    )
}

export default UserProfile;