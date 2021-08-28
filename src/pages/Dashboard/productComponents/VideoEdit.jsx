import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { BACKEND_URL, config } from '../../../actions/types';
import Loader from '../../../components/Loader';
import { Center } from '../styles/overview';
import { VideoEditContainer } from '../styles/videohosting';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";

const VideoEdit = () => {
        const [video, setVideo] = useState({});
        const [product, setProduct] = useState({});
        const [loading, setLoading] = useState(true);
        const [disable, setDisable] = useState(false);
        const { register, handleSubmit } = useForm();
        const { t } = useTranslation();
        let history = useHistory();

        let params = useParams();
        const {owner, isbn_code} = params;

        // UseEffect
        useEffect(() => {
            let cleanupFunction = false;
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${BACKEND_URL}/product/${params.owner}/${params.isbn_code}/video/${params.pk}/`, localStorage.getItem('access') && config);
                    if(!cleanupFunction) {
                        setProduct(response.data.product);
                        setVideo(response.data.video);
                        setLoading(false)
                    }
                } catch (e) {
                    console.error(e.message)
                }
            };
    
            fetchData()
            return () => cleanupFunction = true;   
        }, [params ]);


        // Videohosting
        const handleVideo = async videoData =>  {
            setDisable(true)
            try {
                await axios.put(`${BACKEND_URL}/product/${owner}/${isbn_code}/video/${video.id}/`, videoData, localStorage.getItem('access') && config)
                history.push(`/product/${owner}/${isbn_code}/video/${video.id}`);
                setDisable(false)
            } catch (e) {
                console.log(e);
            }
        }

    return (
        <VideoEditContainer>
            <Link className="close" to={`/product/${product.owner}/${product.isbn_code}/video/${video.id}`}>Закрыть</Link>
            {loading ? 
                <Center><Loader/></Center>
            : 
            <div className="video-edit">
                <form onSubmit={handleSubmit(handleVideo)}>
                    <h4>Редактировать {video.title}</h4>
                    <div className="form-group">
                        <label htmlFor="">{t('dashboard.product.update.videohosting.title')}</label>
                        <input type="text" defaultValue={video.title} {...register('title')} maxLength="64" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">{t('dashboard.product.update.videohosting.link')}</label>
                        <input type="text" defaultValue={video.frame_url} {...register('frame_url')} maxLength="255" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">{t('dashboard.product.update.videohosting.body')}</label>
                        <textarea defaultValue={video.body} {...register('body')} cols="50" rows="10"  name="body"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">{t('dashboard.product.update.videohosting.access')}</label>
                        <input type="checkbox" defaultChecked={video.access} {...register('access')}/>
                    </div>
                    <div className="submit">
                        {disable ? <Loader /> :<input type="submit" value="Сохранить" />}
                    </div>
                </form>
            </div>}
        </VideoEditContainer>
    )
}

export default VideoEdit