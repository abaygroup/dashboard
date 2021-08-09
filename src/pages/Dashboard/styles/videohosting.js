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

    .video-block {
        width: 100%;
        margin: 40px 0px;

        .videohosting {
            display: flex;
            justify-content: center;
            width: 100%;

            .video {
                width: 60%;
                margin: 0 20px;
                text-align: center;

                iframe {
                    display: block;
                    min-height: 420px;
                    width: 100%;
                    border-radius: 10px;
                    box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
                }
                h3 {
                    padding: 10px 0;
                    border-bottom: 1px solid ${({theme}) => theme.borderColor};
                }

                .body {
                    text-align: left;
                    padding: 10px 20px;
                    border-bottom: 1px solid ${({theme}) => theme.borderColor};

                    p {
                        font-size: 14px;
                    }
                    a {
                        color: rgb(0,110,255);
                        &:hover { text-decoration: underline; }
                    }
                }
                .foot {
                    padding: 10px 20px;
                    display: flex;
                    border-bottom: 1px solid ${({theme}) => theme.borderColor};
                    justify-content: center;

                    p {
                        font-size: 14px;
                        margin: 0 10px;
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
            
            .comments {
                width: 40%;
                margin: 0 20px;
                height: 420px;
                overflow: auto;


                .comment-box {
                    padding: 10px;
                    margin: 5px;
                    background: ${({theme}) => theme.background};
                    border-radius: 5px;
                    box-shadow: 0 5px 10px rgb(0 0 0 / 12%);

                    .owner {
                        padding: 5px 0;
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid ${({theme}) => theme.borderColor};
                        strong {
                            font-size: 14px;
                        }
                    }
                    .body {
                        padding: 0 5px;
                    }
                }
            }
        }

        .documentation {
            margin: 10px 40px;
            
            h2 {
                padding: 10px 0;
                text-align: center;
            }
            p {
                font-size: 14px;
            }
        }
    }

    @media screen and (min-width: 1800px) {
        width: 1280px;
        margin: 0 auto;
    }


    @media screen and (max-width: 1024px) {
        .video-block {
            .videohosting {
                display: flex;
                justify-content: flex-start;
                flex-direction: column;
                align-items: center;
                
    
                .video {
                    width: 100%;
                    margin: 0 10px;
                }
                
                .comments {
                    display: none;
                }
            }
            .documentation {
                margin: 10px;
            }
        }
    }

    @media screen and (max-width: 720px) {
        .video-block {
            .videohosting {
                .video {
                    margin: 0;
                    
                    iframe {
                        min-height: 360px;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 420px) {
        .video-block {
            .videohosting {
                .video {
                    iframe {
                        min-height: 200px;
                    }
                }
            }
        }
    }
`;


export const VideoEditContainer = styled.div`
    position: relative;

    .close {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 14px;
        transition: all .3s;

        &:hover {
            opacity: .7;
        }
    }

    .video-edit {
        display: flex;
        justify-content: center;
        padding: 50px 0;
        
        form {
            width: 40%;
            margin: 0 20px 20px 20px;
            h4 {
                text-align: left;
                padding-bottom: 5px;
                font-size: 14px;
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
                    display: block;
                    resize: vertical;
                    width: 100%;
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

        form.docs {
            width: 60%;

            h4 {
                text-align: center;
                padding-bottom: 5px;
                font-size: 14px;
            }

            .docs-body {
                max-width: 760px;
                padding: 10px 20px;
            }

            .submit {
                margin: 10px 0;
            }
        }
    }

    // ========================================
    @media screen and (min-width: 1800px) {
        width: 1280px;
        margin: 0 auto;
    }

    @media screen and (max-width: 1024px) {
        .video-edit {
            display: flex;
            align-items: center;
            flex-direction: column;
            padding: 50px 20px;
            
            form {
                width: 100%;
                margin: 20px 0;
            }
    
            form.docs {
                width: 100%;
                margin: 20px 0;
    
                .docs-body {
                    max-width: 760px;
                }
            }
        }
    }
    
`;