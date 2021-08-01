import styled from 'styled-components';

export const OverviewContainer = styled.div`
    width: 1024px;
    transform: translateY(-35px);
    margin: 0 auto;
    display: flex;
    align-items: stretch;
    justify-content: space-between;

    .products-overview {
        width: 55%;
        padding-right: 20px;

        .box {
            border-radius: 5px;
            padding: 20px;
            background: ${({theme}) => theme.background};
            box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
            border: 1px solid ${({theme}) => theme.borderColor};
            margin-bottom: 20px;

            .head {
                display: flex;
                justify-content: space-between;
                align-items: center;
                
                a {
                    border-radius: 5px;
                    border: 1px solid silver;
                    padding: 3px 7px;
                    color: ${({theme}) => theme.color};
                    font-size: 13px;
                    transition: all .3s;

                    &:hover {
                        border: 1px solid ${({theme}) => theme.color};
                    }
                }
            }
            .actions {
                margin: 20px 0;

                .action {
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;

                    .status {
                        display: block;
                        width: 10px;
                        height: 10px;
                        background-color: rgb(0, 255, 200);
                        box-shadow: 0 0 5px rgb(0, 255, 200);
                        border-radius: 50%;
                        margin-right: 10px
                    }

                    a {
                        width: 80%;
                        overflow: hidden;
                        font-size: 14px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        transition: all .3s;

                        &:hover {
                            opacity: .7;
                        }
                    }

                    small {
                        display: inline-block;
                        margin-left: 10px;
                        border-radius: 10px;
                        border: 1px solid silver;
                        padding: 2.5px 7px;
                        font-size: 11px;
                    }
                }
            }

            .end {
                border-top: 1px solid ${({theme}) => theme.borderColor};
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-top: 10px;

                a {
                    display: block;
                    font-weight: 500;
                    font-size: 14px;
                    margin-left: 10px;
                }

                .date {
                    color: #666;
                }
            }
        }
    }

    .activity {
        width: 45%;
        height: 100%;
        padding-left: 20px;

        h4 {
            font-size: 14px;
            font-weight: 600;
            padding-bottom: 10px;
        }  
        
        .activities {
            margin: 20px 0;
            .box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 0;
                border-bottom: 1px solid ${({theme}) => theme.borderColor};

                .signal {
                    display: flex;
                    margin-right: 40px;
                    img {
                        width: 30px;
                        height: 30px;
                        display: inline-block;
                        margin: 0 5px;
                    }
                    p {
                        font-size: 14px;
                        margin: 0 5px;
                    }
                }
                small {
                    color: #666;
                }
            }
        }
    }

    .view-all {
        display: inline-block;
        font-size: 14px;
        font-weight: bolder;
        color: rgb(0, 110, 255);
        transition: all .3s;

        &:hover {
            opacity: .7;
        }
    }
`;

export const Center = styled.div`
    width: 100%;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;