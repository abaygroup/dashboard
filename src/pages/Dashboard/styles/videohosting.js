import styled from 'styled-components';

export const VideoDetailContainer = styled.div`
    width: 100%;
    padding: 20px;
    position: relative;

    .close {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 14px;
        transition: all .3s;

        &:hover {
            opacity: .7;
        }
    }

`;


export const VideoEditContainer = styled.div`
    width: 1280px;
    margin: 0 auto;
`;