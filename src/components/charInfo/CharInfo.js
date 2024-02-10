import './charInfo.scss';


import { useContext, useEffect, useRef, useState } from 'react';


import useMarvelService from '../../services/MarvelService';
// import ErrorMessage from '../error/ErrorMessage';
// import Loading from '../loading/Loading';
// import Skeleton from '../skeleton/Skeleton';
import setContent from '../../utils/setContent';
import { CharId } from '../../context/context';
import { Link } from 'react-router-dom';


const CharInfo = () => {

    const { loading, error, clearError, process, setProcess, getCharacter } = useMarvelService();

    const { charId } = useContext(CharId)

    const [char, setChar] = useState(false)

    // const [loading, setLoading] = useState(false)

    // const [error, setError] = useState(false)

    const charInfoRefInside = useRef(null)


    const updateChar = (id) => {
        console.log(id);
        clearError()
        getCharacter(id)
            .then(res => {
                setChar(res)

                charInfoRefInside.current.scrollIntoView({ behavior: 'smooth' })
            })
            .then(()=> setProcess('confirmed'))

    }

    useEffect(() => {
        if (!charId) {
            return
        }
        updateChar(charId)

    }, [charId])

    // const setContent = () => {
    //     switch(process){
    //         case 'waiting':
    //             return <Skeleton />
    //         case 'loading':
    //             return <Loading />
    //         case 'confirmed':
    //             return <View char={char} />
    //         case 'error':
    //             return <ErrorMessage />
    //     }
    // }

    // const skeleton = char || loading || error ? null : <Skeleton />
    // const errorMessage = error ? <ErrorMessage /> : null
    // const loadingMessage = loading ? <Loading /> : null
    // const content = !(loading || error || !char) ? <View char={char} /> : null


    return (
        <div
            className="char__info"
            ref={charInfoRefInside}
        >
            {setContent(process, View, char)}
        </div>
    )
}


const View = ({ data }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = data

    const comicsList = comics.slice(0, 9)

    //console.log('aaaaaaaaaaaaa' + comicsList[0].resourceURI.split('/')[]); 

    const styleForNotFound = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? { objectFit: 'fill' } : null

    return (
        <>
            <div className="char__basics" >
                <img style={styleForNotFound} src={thumbnail} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {!comics.length ? 'There is no comics about this character' :
                    comicsList.map((comic, i) => {
                        return (
                            <Link key={i} className="char__comics-item" to={`/comics/${comic.resourceURI.split('/').at(-1)}`}>
                                <li>
                                    {comic.name}
                                </li>
                            </Link>

                        )
                    })}
            </ul>
        </>
    )
}

export default CharInfo;