import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useMarvelService from '../services/MarvelService';

import ErrorMessage from '../components/error/ErrorMessage';
import Loading from '../components/loading/Loading';
import Helmet from "react-helmet";
import './singleComicPage.scss';
import AppBanner from '../components/appBanner/AppBanner';
//import xMen from '../resources/img/x-men.png';

import setContent from '../utils/setContent';

const SingleComicPage = () => {

    const { comicId } = useParams()



    const { loading, error, clearError, getComic, process, setProcess } = useMarvelService();

    const [comic, setComic] = useState(null)

    // const [loading, setLoading] = useState(false)

    // const [error, setError] = useState(false)

    //const charInfoRefInside = useRef(null)


    const updateComic = (id) => {
        console.log(id);
        clearError()
        getComic(id)
            .then(res => {
                console.log(res);
                setComic(res)
            })
            .then(() => setProcess('confirmed'))
            .catch((err) => {
                console.log(err);
            })

    }

    useEffect(() => {

        updateComic(comicId)

    }, [comicId])


    // const errorMessage = error ? <ErrorMessage /> : null
    // const loadingMessage = loading ? <Loading /> : null
    // const content = !(loading || error || !comic) ? <View comic={comic} /> : null
    ///                      ДОРАБОТАЙ ЧУТЬ ПОЗЖЕ

    return (
        <>
            {setContent(process, View, comic)}
        </>
    )
}

const View = ({ data }) => {
    const { title, description, pageCount, thumbnail, language, price } = data

    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>Comic info page marvel</title>
                <meta name="description" content="Comic info" />
            </Helmet>
            <AppBanner />
            <div className="single-comic">
                <img src={thumbnail} alt="picture" className="single-comic__img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                {/* <Link to={"/comics"} className="single-comic__back">Back to all</Link> */}
                <button onClick={() => navigate(-1)} className="single-comic__back">Back</button>
            </div>
        </>

    )
}

export default SingleComicPage;