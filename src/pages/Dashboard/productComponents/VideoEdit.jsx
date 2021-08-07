import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BACKEND_URL } from '../../../actions/types';
import Loader from '../../../components/Loader';
import { Center } from '../styles/overview';
import { VideoEditContainer } from '../styles/videohosting';


const VideoEdit = () => {
        const [video, setVideo] = useState({})
        const [product, setProduct] = useState({})
        const [loading, setLoading] = useState(true);
        let params = useParams();
        // UseEffect
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
        }, [params ]);

    return (
        <VideoEditContainer>
            <Link className="close" to={`/product/${product.owner}/${product.isbn_code}/`}>Закрыть</Link>
            {loading ? 
                <Center><Loader/></Center>
            : <div>
                <h1>Edit {video.title}</h1>
            </div>}
        </VideoEditContainer>
    )
}

export default VideoEdit;