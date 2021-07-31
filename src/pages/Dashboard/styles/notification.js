import styled from 'styled-components';

export const NotificationContainer = styled.div`
    display: flex;
    align-items: flex-start;
    width: 1280px;
    margin: 0 auto;

    .notification {
        width: 80%;
        margin: 20px auto;

        .item {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid ${({theme}) => theme.borderColor};


            .body-ms {
                display: flex;
                width: 70%;
                
                .logo-box {
                    margin-right: 20px;
                    img {
                        width: 32px;
                    }
                }

            }

            .access {
                
                button {
                    padding: 5px 20px;
                    margin: 5px auto;
                    display: block;
                    cursor: pointer;
                    border: 1px solid ${({theme}) => theme.borderColor};
                    color: ${({theme}) => theme.color};
                    border-radius: 5px;
                    background: transparent;
        
                    &:hover {
                        border: 1px solid ${({theme}) => theme.color};
                    }
                }
            
            }
        }
    }

    @media screen and (max-width: 1280px) {
        width: 1024px;
    }

    @media screen and (max-width: 1024px) {
        width: 100%;
    }

`;