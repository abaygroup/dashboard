import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';


const UserProfileContainer = styled.div`
    .header {
        display: flex;
        justify-content: center;
        padding: 10px;

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
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        margin: 20px 0;

    }

    .edit {
        width: 720px;
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
                <h4>{props.brand.brandname}</h4>
                <p>{props.brand.email}</p>
                <p>{props.dashboard.fist_name} {props.dashboard.last_name}</p>
                <Link to="/branding">Перейти в панель управление</Link>
            </div>
        </UserProfileContainer>
    )
}

export default UserProfile;