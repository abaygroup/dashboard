import React from 'react';
import styled from 'styled-components';


const LoaderContainer = styled.div`
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({theme}) => theme.background};
    color: ${({theme}) => theme.color};
`;

const FullLoader = () => {
    return (
        <LoaderContainer>
            <p>Загрузка...</p>
        </LoaderContainer>
    )
}

export default FullLoader