import './charList.scss';
import { useState, useEffect, useContext, useRef, memo, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';


import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../error/ErrorMessage';
import Loading from '../loading/Loading';

import CharItem from '../charItem/CharItem';

import { CSSTransition } from 'react-transition-group';


function setContent(process, Component, newLoading) {

    console.log('ttt ' + newLoading);
    console.log('process ' + process);
    switch (process) {
        case 'waiting':
            return <Loading />
        case 'loading':
            return newLoading ? <Component /> : <Loading />
        case 'confirmed':
            return <Component />
        case 'error':
            return <ErrorMessage />
        default:
            throw new Error('Unexpected process state');
    }
}


const CharList = memo(function CharList() {


    const { loading, error, clearError, getSomeCharacters, process, setProcess } = useMarvelService();

    const charItemsRef = useRef([])

    const [chars, setChars] = useState([])

    const [offset, setOffset] = useState(210)

    const [charsEnded, setCharsEnded] = useState(false)

    const [firstLoaded, setFirstLoaded] = useState(false)

    const [newLoading, setNewLoading] = useState(false)

    const [localStorageLoaded, setLocalStorageLoaded] = useState(false)

    const [pageEnded, setPageEnded] = useState(false)

    const [countOfCardsLoaded, setCountOfCardsLoaded] = useState(0)


    


    const setCharsToCards = (limit = 9, currentOffset = offset) => {

        clearError()
        setNewLoading(true)

        getSomeCharacters(limit, currentOffset)
            .then(res => {
                if (res.length % 9 !== 0) {
                    setCharsEnded(true)
                }
                if (limit > 9 && JSON.parse(localStorage.getItem('storageOffset'))) {
                    setOffset(JSON.parse(localStorage.getItem('storageOffset')) + 9)
                    console.log("objectOFFSET:" + offset);
                } else {
                    setOffset(offset + 9)
                    localStorage.setItem('storageOffset', JSON.stringify(offset))
                }
                console.log('offset ' + offset);
                console.log(res);
                setChars([...chars, ...res])

                setNewLoading(false)

                setPageEnded(false)
                setCountOfCardsLoaded(prev => prev + 1)
                if(!firstLoaded) {
                    setFirstLoaded(true)
                }
                console.log(chars);

            })
            .then(() => setProcess('confirmed'))
    }



    useEffect(() => {
        if (localStorage.getItem('storageOffset')) {

            const oldOffset = JSON.parse(localStorage.getItem('storageOffset'))

            setCharsToCards(oldOffset - offset + 9, offset)

            console.log('if');
        } else {
            setCharsToCards()
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
        setCharsToCards()

    }, [pageEnded])

    const debouncedOnScroll = debounce(() => {
        if ((window.innerHeight + window.scrollY >= document.body.offsetHeight) && !pageEnded && !newLoading) {
            setPageEnded(true);
            console.log('page ended');

        }

    }, 100);

    function onScroll() {

        if (newLoading) return

        if (charsEnded) {
            window.removeEventListener("scroll", onScroll);
        }

        debouncedOnScroll()
    }

    const charItems = chars.map((props) => {

        return (
            <CSSTransition
                key={props.id}
                in={true}
                timeout={300}
                classNames="charCard"
                appear>
                <CharItem ref={charItemsRef} {...props} />
            </CSSTransition>
        )
    })

    const charListInside = () => {
        return (
            <>
                <ul className="char__grid">
                    {charItems}
                </ul>
                <button
                    style={{ display: charsEnded ? 'none' : "block" }}
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

    const result = useMemo(()=>{
        return setContent(process, () => charListInside(), firstLoaded)
    }, [process])

    const items = charListInside()

    const errorMessage = error ? <ErrorMessage /> : null
    const loadingMessage = loading ? <Loading /> : null

    return (
        <div className="char__list">
            {/* {result} */}
            {errorMessage}
            {loadingMessage}
            {items}
        </div>
    )
})


export default CharList;


