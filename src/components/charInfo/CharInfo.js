import './charInfo.scss';


import { useContext, useEffect, useState } from 'react';


import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../error/ErrorMessage';
import Loading from '../loading/Loading';
import Skeleton from '../skeleton/Skeleton';
import { CharId } from '../../context/context';

const CharInfo = () => {

    const {charId} = useContext(CharId)

    const [char, setChar] = useState(false)

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(false)



    const marvelService = new MarvelService();

    const updateChar = (id) => {
        console.log(id);
        setError(false)
        setLoading(true)

        marvelService
            .getCharacter(id)
            .then(res => {
                setChar(res)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
                setError(true)
            })
    }

    useEffect(() => {
        console.log('aaa');
        if(!charId){
            //setLoading(false)
            return
        }
        updateChar(charId)
        
    }, [charId])

    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorMessage /> : null
    const loadingMessage = loading ? <Loading /> : null
    const content = !(loading || error || !char) ? <View char={char} /> : null


    return (
        <div 
            className="char__info"
            >
            {skeleton}
            {errorMessage}
            {loadingMessage}
            {content}
        </div>
    )
}


const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = char

    // console.log(comics);

    // const comicsList = []
    // if(comics.length != 0) {
    //     for (let i = 0; i < 9; i++) {
    //         comicsList.push(             
    //             <li
    //                 key={i}
    //                 className="char__comics-item">
    //                 {comics[i].name}
    //             </li>
    //         )
            
    //     }
    // }

    const comicsList = comics.slice(0, 9)

    // if(comics.length > 9) {
    //     comics.length = 9
    // }
    

    const styleForNotFound = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'fill'} : null

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
                { !comics.length ? 'There is no comics about this character' : 
                    comicsList.map((comic, i) => {
                        return (
                            <li
                                key={i}
                                className="char__comics-item">
                                {comic.name}
                            </li>
                        )
                })} 
            </ul>
        </>
    )
}

export default CharInfo;