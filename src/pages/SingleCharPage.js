import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useMarvelService from '../services/MarvelService';

import ErrorMessage from '../components/error/ErrorMessage';
import Loading from '../components/loading/Loading';
import AppBanner from '../components/appBanner/AppBanner';
import Helmet from "react-helmet";
import setContent from '../utils/setContent';

import './singleComicPage.scss';
//import xMen from '../resources/img/x-men.png';



const SingleComicPage = () => {

    const { charId } = useParams()



    const { loading, error, clearError, getCharacter, process, setProcess } = useMarvelService();

    const [char, setChar] = useState(null)

    // const [loading, setLoading] = useState(false)

    // const [error, setError] = useState(false)

    //const charInfoRefInside = useRef(null)


    const updateChar = (id) => {
        console.log(id);
        clearError()
        getCharacter(id)
            .then(res => {
                console.log(res);
                setChar(res)
            })
            .then(() => setProcess('confirmed'))
            .catch((err) => {
                console.log(err);
            })

    }

    useEffect(() => {

        updateChar(charId)

    }, [charId])


    ///                      ДОРАБОТАЙ ЧУТЬ ПОЗЖЕ

    return (
        <>
            {setContent(process, View, char)}
        </>
    )
}

const View = ({ data }) => {
    const { name, description, thumbnail } = data

    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>Character info page marvel</title>
                <meta name="description" content="Character info" />
            </Helmet>
            <AppBanner />
            <div className="single-comic">
                <img style={{ objectFit: 'contain' }} src={thumbnail} alt="picture" className="single-char__img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                </div>
                {/* <Link to={"/comics"} className="single-comic__back">Back to all</Link> */}
                <button onClick={() => navigate(-1)} className="single-comic__back">Back</button>
            </div>
        </>

    )
}

export default SingleComicPage;