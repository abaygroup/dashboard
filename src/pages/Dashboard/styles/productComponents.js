import styled from 'styled-components';

export const Container = styled.div`
    width: 1280px;
    margin: 0 auto;

    h4 {
        padding-bottom: 10px;
        text-align: center;
        font-size: 14px;
    }

    .edit-form, .create-form {
        margin-top: 20px;
        display: flex;

        .instruction {
            width: 50%;
            margin: 0 20px 20px 20px;
            display: inline-block;
            h4 {
                text-align: left;
                padding-left: 5px;
                padding-bottom: 5px;
                border-bottom: 1px solid ${({theme}) => theme.borderColor};
            }
            small {
                ul {
                    margin: 10px 40px;
                    line-height: 1.5;
                }
            }
        }

        .main-edit {
            width: 55%;

            form {
                width: auto;
            }
        }

        form {
            margin: 0 20px 20px 20px;
            h4 {
                text-align: left;
                padding-bottom: 5px;
                
                border-bottom: 1px solid ${({theme}) => theme.borderColor};
            }

            .form-group {
                padding: 10px 0;

                .picture-side {
                    display: flex;
                    align-items: center;
        
                    img {
                        border-radius: 10px;
                        width: 120px;
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
                    width: 80%;
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

            .col-field {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
            }
        }

        form.ai {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            h4 {
                width: 100%;
            }

            .form-group {
                display: flex;
                align-items: center;
                width: 100%;
            }
        }
    }

    .videohosting {
        width: 45%;
        
        .col-field {
            .form-group {
                margin: 0 5px;

                a {
                    display: block;
                    width: 360px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    font-size: 14px;
                    &:hover {
                        text-decoration: underline; 
                    }
                }

                img {
                    margin: 0 5px;
                    width: 20px;
                }
                textarea {
                    width: 90%;
                }
            }
        }
        .lists {
            border-bottom: 1px solid ${({theme}) => theme.borderColor};
        }
    }

    // ========================================
    @media screen and (max-width: 1280px) {
        width: 1024px;
    
        .edit-form {
            form {
                .form-group {
                    label {
                        display: block;
                    }
                }
            }

            .videohosting {
                .col-field {
                    .form-group {
                        a {
                            width: 260px;
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 1024px) {
        width: 100%;

        .edit-form, .create-form {
            display: flex;
            flex-direction: column;
            align-items: center;
    
            .instruction {
                display: none;
            }
    
            .main-edit {
                width: 100%;
            }
    
            form {
                margin: 20px;
    
                .form-group {
                    label {
                        display: inline-block;
                    }
                }
            }

            .videohosting {
                width: 100%;
                padding: 0 20px;
            }
        }
    }
`;


export const ProductDetail = styled.div`
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

    .product-block {
        display: flex;
        justify-content: center;
        text-align: center;
        margin: 40px 0px;

        .product {
            width: 60%;
            .images {
                .main-image {
                    width: 100%;
                    margin: 0 10px;
        
                    img {
                        box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
                        border-radius: 10px;
                        width: 640px;
                    }
                }
        
                .ai-images {
                    width: 640px;
                    margin: 0 auto;
                    text-align: left;
                    overflow-y: hidden;
                    overflow-x: scroll;
                    white-space: nowrap;
                
                    /* width */
                    ::-webkit-scrollbar {
                        height: 4px;
                    }
                    img {
                        width: 64px;
                        height: auto;
                        border-radius: 5px;
                        margin: 5px;
                        display: inline-block;
                        white-space: nowrap;
                        cursor: pointer;
                        box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
                    }
                }
            }
                    
        
            .product-info {
                padding: 20px 40px;
                
                h3 {
                    padding-bottom: 10px;
                    border-bottom: 1px solid ${({theme}) => theme.borderColor};
                }
                h1 {
                    padding: 10px;
                    font-weight: 600;
                }

                .subcategory {
                    font-size: 14px;
                    display: inline-block;
                    margin-bottom: 10px;
                }
        
                p {
                    text-align: left;
                    font-size: 14px;
                    a {
                        color: rgb(0,110,255);
                        &:hover { text-decoration: underline; }
                    }
                }

                .buttons {
                    a, span {
                        margin: 20px 5px;
                        display: inline-block;
                        padding: 4px 20px;
                        border-radius: 5px;
                        border: 1px solid ${({theme}) => theme.borderColor};
                        font-size: 13px;
                        cursor: pointer;

                        &:hover {
                            border: 1px solid ${({theme}) => theme.color};
                        }
                    }
                }
            }
        
            .features {
                margin-top: 20px;
        
                h4 {
                    font-size: 14px;
                    font-weight: 600;
                }
        
                span {
                    font-size: 14px;
                    padding: 10px 0;
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid ${({theme}) => theme.borderColor};
        
                    strong { 
                        font-weight: 600;
                    }
                }
            }
        }

        .videohosting {
            width: 40%;

            margin-left: 20px;
            
            .video-box {
                background: ${({theme}) => theme.background};
                border-radius: 5px;
                padding: 10px;
                margin: 10px 0;
                box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
    
                h4 {
                    display: flex;
                    justify-content: space-between;
                    text-align: left;
                    padding: 10px;
                    border-bottom: 1px solid ${({theme}) => theme.borderColor};
                    a {
                        font-size: 14px;
    
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                    .collapse {
                        cursor: pointer;
                        font-weight: normal;
                    }
                }
    
                small.body {
                    /* width */
                    ::-webkit-scrollbar {
                        height: 5px;
                    }

                    height: 0;
                    overflow: hidden;
                    padding: 0;
                    text-align: left;
                    display: block;
    
                    a {
                        color: rgb(0,110,255);
                        &:hover { text-decoration: underline; }
                    }
                }
                small.expand {
                    border-bottom: 1px solid ${({theme}) => theme.borderColor};
                    padding: 10px;
                    height: auto;
                    overflow: auto;
                }
    
                .access {
                    padding: 5px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
    
                    span {
                        display: flex;
                        align-items: center;
    
                        img {
                            margin-right: 5px;
                            width: 20px;
                        }
                    }
                }
            }
        }
    }

    // ========================================
    @media screen and (max-width: 1200px) {
        .product-block {
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
    
            .product {
                width: 80%;
                margin: 0;
                .images {
                    .main-image {
                        width: 100%;
                        margin: 0;
            
                        img {
                            box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
                            border-radius: 10px;
                            width: 100%;
                        }
                    }
            
                    .ai-images {
                        width: 100%;
                        overflow: auto
                        white-space: nowrap;
                    }
                }

                .product-info {
                    padding: 10px 0px;
                }

                .features {
                    margin: 20px 0;
                }
            }
    
            .videohosting {
                width: 80%;
                margin: 0;
            }
        }
    }


    @media screen and (max-width: 720px) {
        .product-block {
            .product {
                width: 100%;
            }
            .videohosting {
                width: 100%;
            }
        }
    }
`;