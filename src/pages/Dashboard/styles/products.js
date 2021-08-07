import styled from 'styled-components';


export const ProductsContainer = styled.div`
    display: flex;
    align-items: flex-start;
    width: 1280px;
    margin: 0 auto;
    transform: translateY(-35px);

    .product-list {
        width: 70%;
        display: flex;
        flex-direction: column;
        padding-right: 20px;

        .product {
            display: flex;
            justify-content: space-between;
            padding: 20px;
            border-radius: 5px;
            margin: 5px 0;
            background-color: ${({theme}) => theme.background};
            border: 1px solid ${({theme}) => theme.borderColor};
            box-shadow: 0 5px 10px rgb(0 0 0 / 12%);

            .title {
                width: 70%;
            
                .header {
                    border-bottom: 1px solid ${({theme}) => theme.borderColor};
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 5px;

                    h4 {
                        padding-bottom: 5px;
                        font-weight: 500;
                    }
                    a {
                        font-size: 13px;
                        border: 1px solid ${({theme}) => theme.borderColor};
                        border-radius: 5px;
                        padding: 2px 4px;
                        cursor: pointer;
                        transition: all .3s;

                        &:hover {
                            border: 1px solid ${({theme}) => theme.color};
                        }
                    }
                }


                p {
                    padding-top: 5px;
                    -webkit-line-clamp: 3; 
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    font-size: 14px;
                    overflow: hidden;
                }

                hr {
                    height: 0;
                    border: none;
                    margin-top: 5px;
                    border-top: 1px solid ${({theme}) => theme.borderColor};
                }

                .owner {
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    
                    small {
                        padding: 0 10px;
                        display: flex;
                        align-items: center;

                        img, strong {
                            margin: 0 2px;
                        }
                    }
                    .deleteBtn, .editBtn {
                        border: 1px solid ${({theme}) => theme.borderColor};
                        border-radius: 5px;
                        padding: 2px 5px;
                        margin: 0 5px;
                        cursor: pointer;
                        transition: all .3s;

                        &:hover {
                            border: 1px solid ${({theme}) => theme.color};
                        }
                    }
                }
            }

            .image {
                img {
                    height: 120px;
                    border-radius: 5px;
                }
            }
        }
    }
    .filter {
        width: 20%;
        paddin-left: 20px;

        h4 {
            font-size: 14px;
            font-weight: 600;
            padding-bottom: 10px;
        }  

        form {
            background: ${({theme}) => theme.background};
            border: 1px solid ${({theme}) => theme.borderColor};
            padding: 20px;
            border-radius: 5px;
            .form-group {
                display: flex;
                justify-content: space-between;
                padding-bottom: 5px;
                padding-left: 5px;
                padding-right: 5px;
                align-items: center;
                border-bottom: 1px solid ${({theme}) => theme.borderColor};


                label {
                    padding: 0 5px;
                    font-size: 14px;
                }
                input {
                    padding: 5px;
                }
            }
        }
    }

    // ===========================================

    @media screen and (max-width: 1280px) {
        width: 1024px;

        .product-list {
            .product {
                .image {
                    margin: 0 5px;
                }
            }
        }
    }

    @media screen and (max-width: 1024px) {
        width: 100%;
        justify-content: center;

        .product-list {
            width: 100%;
            padding: 20px;
        }

        .filter {
            display: none;
        }
    }

    @media screen and (max-width: 720px) {
        .product-list {
            padding: 20px 10px;

            .product {
                flex-direction: column;
                justify-content: flex-start;
    
                .title {
                    width: 100%;
                
                    .owner {
                        margin: 10px 0;
                        flex-wrap: wrap;
                        
                        small {
                            padding: 5px 10px;
                        }
                    }
                }

                .image {
                    margin: 0;
                    img {
                        width: 100%;
                        height: auto;
                    }
                }
            }
        }
    }
`;