import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { BACKEND_URL, item } from '../../../actions/types';
import Loader from '../../../components/Loader';
import { Center } from '../styles/overview';
import { VideoDetailContainer } from '../styles/videohosting';


const VideoDetail = () => {
    const [video, setVideo] = useState({})
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    let params = useParams()
    const { t } = useTranslation();

    useEffect(() => {
        let cleanupFunction = false;
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`
                    }
                }
                const response = await axios.get(`${BACKEND_URL}/product/${params.owner}/${params.isbn_code}/video/${params.pk}/`, localStorage.getItem('access') && config);
                if(!cleanupFunction) {
                    setProduct(response.data.product)
                    setVideo(response.data.video);
                    setLoading(false)
                }
            } catch (e) {
                console.error(e.message)
            }
        };

        fetchData()
        return () => cleanupFunction = true;   
    }, [params])

    return (
        <VideoDetailContainer>
            <Link className="close" to={`/product/${product.owner}/${product.isbn_code}/`}>{t('dashboard.detail.close')}</Link>
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
                <div className="video">
                    <iframe src={video.frame_url} title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <h4>{video.title}</h4>
                    <div className="body">
                        <small>{video.body}</small><br />
                        <small>{video.timestamp}</small><br />
                        <small>{video.access ? 'YES' : 'NO'}</small>
                    </div>
                    <Link to={`/product/${product.owner}/${product.isbn_code}/video/${video.id}/edit`}>Изменение</Link>
                </div>
            </motion.div>}
        </VideoDetailContainer>        
    )
}

export default VideoDetail