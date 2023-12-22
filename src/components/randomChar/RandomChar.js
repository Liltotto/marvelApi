import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import Loading from '../loading/Loading';
import ErrorMessage from '../error/ErrorMessage';

const RandomChar = () => {

    const [char, setChar] = useState({})

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState(false)



    const marvelService = new MarvelService();

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
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
        updateChar()
    }, [])

    //const {name, description, thumbnail, homepage, wiki} = char

    const errorMessage = error ? <ErrorMessage/> : null
    const loadingMessage = loading ? <Loading/> : null
    const content = !(loading || error) ? <View char={char} /> : null

    return (
        <div className="randomchar">

            {errorMessage}
            {loadingMessage}
            {content}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button
                    className="button button__main"
                    onClick={updateChar}
                    disabled={loading}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki } = char

    const randomchar__img__class = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'randomchar__img not_found' : 'randomchar__img'

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={randomchar__img__class} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;