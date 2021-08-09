import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Moment from 'react-moment';
import { Link, useHistory, useParams } from 'react-router-dom';
import { BACKEND_URL, config, item } from '../../../actions/types';
import Loader from '../../../components/Loader';
import { Center } from '../styles/overview';
import { VideoDetailContainer } from '../styles/videohosting';
import ReactHtmlParser from 'react-html-parser';

const VideoDetail = () => {
    const [video, setVideo] = useState({})
    const [product, setProduct] = useState({})
    const [comments, setComments] = useState([]);
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true)
    let params = useParams()
    let history = useHistory();

    const { t } = useTranslation();


    useEffect(() => {
        let cleanupFunction = false;
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/product/${params.owner}/${params.isbn_code}/video/${params.pk}/`, localStorage.getItem('access') && config);
                if(!cleanupFunction) {
                    setProduct(response.data.product)
                    setVideo(response.data.video);
                    setComments(response.data.comment);
                    setDocs(response.data.docs);
                    setLoading(false)
                }
            } catch (e) {
                console.error(e.message)
            }
        };

        fetchData()
        return () => cleanupFunction = true;   
    }, [params])

    const deleteVideo = async () => {
        try {
            await axios.delete(`${BACKEND_URL}/product/${params.owner}/${params.isbn_code}/video/${video.id}/`, localStorage.getItem('access') && config)
            history.push(`/product/${params.owner}/${params.isbn_code}/`);
        } catch (e) {
            console.log(e);
        }
    }

    const deleteDocs = async () => {
        try {
            await axios.delete(`${BACKEND_URL}/product/${params.owner}/${params.isbn_code}/video/${video.id}/docs/${docs[0].id}/`, localStorage.getItem('access') && config)
            history.push(`/product/${params.owner}/${params.isbn_code}/video/${video.id}`);
        } catch (e) {
            console.log(e);
        }
    }


    const date = new Date(Date.parse(video.timestamp))

    return (
        <VideoDetailContainer>
            <Link className="close" to={`/product/${product.owner}/${product.isbn_code}/`}>{t('dashboard.product.detail.close')}</Link>
            {loading ? 
                <Center><Loader/></Center>
            : 
            <motion.div
                initial="hidden" 
                animate="visible" 
                variants={item} 
                transition={{duration: 0.25}}
                className="video-block"
            >
                <div className="videohosting">
                    <div className="video">
                        <iframe src={video.frame_url} title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <h3>{video.title}</h3>
                        <div className="body">
                            <p>{video.body}</p>
                        </div>
                        <div className="foot">
                            <p>Дата выхода: <b><Moment locale={localStorage.getItem('i18nextLng') === 'ru'  ? "ru": "kz"} fromNow>{date}</Moment></b></p>
                            <p>Просмотров: <b>{video.view}</b></p>
                        </div>
                        <div className="buttons">
                            <Link to={`/product/${product.owner}/${product.isbn_code}/video/${video.id}/edit`}>Изменить</Link>
                            <span onClick={() => window.confirm(t('dashboard.product.detail.confirm')) && deleteVideo()}>{t('dashboard.product.detail.buttons.delete')}</span>
                        </div>
                    </div>
                    {comments.length > 0 ? 
                    <div className="comments">
                    {comments.map((comment, i) => {
                        const date = new Date(Date.parse(comment.timestamp))
                        return (
                            <div className="comment-box" key={i}>
                                <div className="owner">
                                    <strong>{comment.owner.brandname}</strong>
                                    <small><Moment locale={localStorage.getItem('i18nextLng') === 'ru'  ? "ru": "kz"} fromNow>{date}</Moment></small>
                                </div>
                                <div className="body">
                                    <small>{comment.body}</small>
                                </div>
                            </div>
                        )
                    })}
                    </div>: <small style={{ display: "block", width: "100%", textAlign: "center", marginTop: "50px" }}>Нет комментарии</small>}
                </div>
                <div className="documentation">
                    {docs.length > 0 ? 
                    <React.Fragment>
                        <div className="header">
                            <h2>{docs[0].title}</h2>
                            <small>{docs[0].date_created}</small><br />
                            <small>{docs[0].date_updated}</small><br />
                            <button onClick={deleteDocs}>Удалить</button>
                        </div>
                        <div>{ ReactHtmlParser(docs[0].body) }</div>
                    </React.Fragment>
                    : <small style={{ display: "block", width: "100%", textAlign: "center", marginTop: "50px" }}>Нет документации</small>}
                </div>
            </motion.div>}
        </VideoDetailContainer>        
    )
}

export default VideoDetail