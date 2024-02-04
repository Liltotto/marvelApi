import './comicsList.scss';
import { useState, useEffect, useContext, useRef, memo } from 'react';
import { debounce } from 'lodash';


import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../error/ErrorMessage';
import Loading from '../loading/Loading';
import { Link } from 'react-router-dom';

const ComicsList = () => {


    const { loading, error, clearError, getSomeComics } = useMarvelService();

    const [comics, setComics] = useState([])

    const [offset, setOffset] = useState(210)

    const [comicsEnded, setComicsEnded] = useState(false)

    const [newLoading, setNewLoading] = useState(false)

    const [pageEnded, setPageEnded] = useState(false)

    const [countOfCardsLoaded, setCountOfCardsLoaded] = useState(0)

    const setComicsToCards = (limit = 8, currentOffset = offset) => {

        clearError()
        setNewLoading(true)

        getSomeComics(limit, currentOffset)
            .then(res => {
                if (res.length % 8 !== 0) {
                    setComicsEnded(true)
                }
                if (limit > 8 && JSON.parse(localStorage.getItem('storageOffsetComics'))) {
                    setOffset(JSON.parse(localStorage.getItem('storageOffsetComics')) + 8)
                    console.log("objectOFFSET:" + offset);
                } else {
                    setOffset(offset + 8)
                    localStorage.setItem('storageOffsetComics', JSON.stringify(offset))
                }
                console.log('offset ' + offset);
                console.log(res);
                setComics([...comics, ...res])

                setNewLoading(false)

                setPageEnded(false)
                setCountOfCardsLoaded(prev => prev + 1)

                console.log(comics);

            })
    }



    useEffect(() => {
        if (localStorage.getItem('storageOffsetComics')) {

            const oldOffset = JSON.parse(localStorage.getItem('storageOffsetComics'))

            setComicsToCards(oldOffset - offset + 8, offset)

            console.log('if');
        } else {
            setComicsToCards()
        }

        setTimeout(() => {
            window.addEventListener("scroll", onScroll)
        }, 1000)

        return () => {
            window.removeEventListener('scroll', onScroll);
            debouncedOnScroll.cancel();
        }

    }, [])

    useEffect(() => {


        if (!pageEnded) return
        console.log('else');
        setComicsToCards()

    }, [pageEnded])

    const debouncedOnScroll = debounce(() => {
        if ((window.innerHeight + window.scrollY >= document.body.offsetHeight) && !pageEnded && !newLoading) {
            setPageEnded(true);
            console.log('page ended');

        }

    }, 100);

    function onScroll() {

        if (newLoading) return

        if (comicsEnded) {
            window.removeEventListener("scroll", onScroll);
        }

        debouncedOnScroll()
    }

    const comicItems = comics.map(({title, price, thumbnail, id}, i) => {
        const styleForNotFound = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectPosition: 'left', objectFit: 'cover'} : null
        return (
            <li key={i} className="comics__item">
                <Link to={`/comics/${id}`}>
                    <img style={styleForNotFound} src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{price}</div>
                </Link>
            </li>
        )
    })

    const comicsListInside = () => {
        return (
            <>
                <ul className="comics__grid">
                    {comicItems}
                </ul>
                <button
                    style={{ display: comicsEnded ? 'none' : "block" }}
                    onClick={() => {
                        setPageEnded(true)
                    }}
                    disabled={newLoading}
                    className="button button__main button__long"
                >
                    <div className="inner">load more</div>
                </button>
            </>
        )
    }

    const items = comicsListInside()

    const errorMessage = error ? <ErrorMessage /> : null
    const loadingMessage = loading ? <Loading /> : null

    return (
        <div className="comics__list">
            {errorMessage}
            {loadingMessage}
            {items}
        </div>
    )
}

export default ComicsList;