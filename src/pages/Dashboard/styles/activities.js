import styled from 'styled-components';

export const ActivityContainer = styled.div`
    width: 1280px;
    margin: 0 auto;
    display: flex;

    .activities {
        width: 70%;
        margin: 20px 0;

        .del-all-btn {
            text-align: right;
            padding: 5px 20px;
            cursor: pointer;
            border: 1px solid ${({theme}) => theme.borderColor};
            border-radius: 5px;

            &:hover {
                border: 1px solid ${({theme}) => theme.color};
            }
        }

        .box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            border-bottom: 1px solid ${({theme}) => theme.borderColor};

            .signal {
                display: flex;
                align-items: center;
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

    .posts {
        width: 30%;

        .post {
            text-align: left;
            box-sizing: border-box;
            border-left: 5px solid #03a9f4;
            margin: 40px;
            padding-left: 20px;
            
    
            h3 {
                font-size: 16px;
                font-weight: 500;
            }
            p {
                font-size: 12px;
            }
        }
    }

    // ==============================================

    @media screen and (max-width: 1280px) {
        width: 1024px;
    }

    @media screen and (max-width: 1040px) {
        width: 100%;
        padding: 0 20px;
        flex-direction: column;

        .activities {
            width: 100%;
            margin: 20px 0;
        }
    
        .posts {
            width: 100%;
    
            .post {
                margin: 40px 0;
                padding-left: 20px;
            }
        }
    }

`;