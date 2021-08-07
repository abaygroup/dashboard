import React from 'react';
import styled from 'styled-components';


const LoaderContainer = styled.div`
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    background: ${({theme}) => theme.background};
    color: ${({theme}) => theme.color};


    .loading-box {
        position: absolute;
        top: 50%; left: 42%;

        div {
            position: absolute;
            width: 13px;
            height: 13px;
            border-radius: 50%;
            background: #D8D8D7;
            animation-timing-function: cubic-bezier(0, 1, 1, 0);
    
            &:nth-child(1) {
                left: 8px;
                animation: lds-ellipsis1 0.6s infinite;
            }
            &:nth-child(2) {
                left: 8px;
                animation: lds-ellipsis2 0.6s infinite;
            }
            &:nth-child(3) {
                left: 32px;
                animation: lds-ellipsis2 0.6s infinite;
            }
            &:nth-child(4) {
                left: 56px;
                animation: lds-ellipsis3 0.6s infinite;
            }
        }
    
        @keyframes lds-ellipsis1 {
            0% {
            transform: scale(0);
            }
            100% {
            transform: scale(1);
            }
        }
        @keyframes lds-ellipsis3 {
            0% {
            transform: scale(1);
            }
            100% {
            transform: scale(0);
            }
        }
        @keyframes lds-ellipsis2 {
            0% {
            transform: translate(0, 0);
            }
            100% {
            transform: translate(24px, 0);
            }
        }
    }
`;

const FullLoader = () => {
    return (
        <LoaderContainer>
            <div className="loading-box">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </LoaderContainer>
    )
}

export default FullLoader