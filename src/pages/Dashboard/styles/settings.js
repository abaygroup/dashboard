import styled from 'styled-components';

export const SettingContainer = styled.div`
    display: flex;
    align-items: flex-start;
    width: 1280px;
    margin: 0 auto;
    display: flex;
    justify-content: center;

    .domain, .password-change {
        margin: 20px auto;
    }

    form {
        h4 {
            padding-left: 10px;
            padding-bottom: 10px;
            font-size: 14px;
            border-bottom: 1px solid ${({theme}) => theme.borderColor};
        }
        .form-group {
            padding: 10px 0;
    
            .logotype-side {
                display: flex;
                align-items: center;
    
                img {
                    border-radius: 10px;
                    width: 64px;
                    margin: 10px;
                }
                .delete-logo-btn {
                    cursor: pointer;
                }
            }
           
    
            label {
                display: inline-block;
                font-size: 14px;
                margin: 0 5px;
            }
            input, textarea, select {
                display: inline-block;
                margin: 0 5px;
                padding: 5px 10px;
                border-radius: 5px;
                border: 1px solid ${({theme}) => theme.borderColor};
                color: ${({theme}) => theme.color};
                background: ${({theme}) => theme.background};
                font-family: "Inter", sans-serif;
            }
            textarea {
                resize: vertical;
                display: block;
            }
    
            span {
                display: inline-block;
                padding: 5px 10px;
                cursor: pointer;
            }
        }
        .submit {
            input {
                display: inline-block;
                padding: 5px 15px;
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
    
                &:disabled {
                    opacity: .5;
                    cursor: inherit;
                }
            }
        }
    }

    // ======================================

    @media screen and (max-width: 1280px) {
        width: 1024px;
    }

    @media screen and (max-width: 1040px) {
        width: 100%;

        .domain, .password-change {
            padding: 0 10px;
        }
    }
`;
