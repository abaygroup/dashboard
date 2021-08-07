import React from 'react';
import styled from 'styled-components';
import icon64 from '../assets/images/icon64.png';

const FooterContainer = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80px;
    padding: 20px;
    background-color: ${({theme}) => theme.background };
    border-top: 1px solid ${({theme}) => theme.borderColor};

    .copyright {
        display: flex;
        align-items: center;
        
        img, a {
            display: block;
        }
        a {
            color: ${({theme}) => theme.color };
            font-weight: 500;
            margin-left: 10px;
        }
    }

`;

const Footer = () => {
    return (
        <FooterContainer>
            <div className="copyright">
                <img src={icon64} width="32px" alt=""/>
                <a href="https://abaystreet.com" rel="noreferrer" target="_blank">Компания aBay <small>st.</small></a>
            </div>
        </FooterContainer>
    )
}

export default Footer