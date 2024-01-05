import './charList.scss';
import { useState, useEffect, useContext, useRef, memo } from 'react';
import { debounce } from 'lodash';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../error/ErrorMessage';
import Loading from '../loading/Loading';

import CharItem from '../charItem/CharItem';
// import { CharId } from '../../context/context';

const CharList = memo(function CharList() {

    // const {charId, setCharId} = useContext(CharId)

    const charItemsRef = useRef([])

    const [chars, setChars] = useState([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState(false)

    const [offset, setOffset] = useState(210)

    const [charsEnded, setCharsEnded] = useState(false)

    const [newLoading, setNewLoading] = useState(false)

    //const [limit, setLimit] = useState(9)

    //const [localStorageLoading, setLocalStorageLoading] = useState(false)

    const [countOfEndOfPage, setCountEndOfPage] = useState(0)

    

    const marvelService = new MarvelService();

    const setCharsToCards = (limit = 9, currentOffset = offset) => {
        //const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        setError(false)
        
        setNewLoading(true)

        marvelService
            .getSomeCharacters(limit, currentOffset)
            .then(res => {
                if (res.length % 9 !== 0) {
                    setCharsEnded(true)
                }
                if(limit > 9 && JSON.parse(localStorage.getItem('storageOffset'))) {
                    setOffset(JSON.parse(localStorage.getItem('storageOffset')) + 9)
                    console.log("objectOFFSET:" + offset);
                } else{
                    setOffset(offset + 9)
                    localStorage.setItem('storageOffset', JSON.stringify(offset))
                }
                console.log('offset ' + offset);
                console.log(res);
                setChars([...chars, ...res])
                setLoading(false)
                setNewLoading(false)
                //setOffset(offset + 9)
                
                
                //setLimit(9)
                console.log(chars);

            })
            .catch(() => {
                setLoading(false)
                setError(true)

            })
    }

   

    useEffect(() => {
        
        

        setLoading(true)

        //setOffset(() => localStorage.getItem('storageOffset') ? JSON.parse(localStorage.getItem('storageOffset')) : 210)
        
        if(localStorage.getItem('storageOffset') && loading) {
            
            const oldOffset = JSON.parse(localStorage.getItem('storageOffset')) 
            //setOffset(oldOffset)
            //setLimit(oldOffset - offset)
            //setOffset((prev) => prev + oldOffset - offset)
            console.log(oldOffset - offset);
            //console.log(limit);
            console.log(oldOffset);
            console.log(offset);
            setCharsToCards(oldOffset - offset + 9, offset)
            
            //console.log(offset);
            //etCharsToCards()
            
            //setLimit(9)
           
        }
        
        window.addEventListener("scroll", onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll);
            debouncedOnScroll.cancel();
        }

    }, [])

    useEffect(() => {
       // if(loading && localStorage.getItem('storageOffset')) return
        if(localStorage.getItem('storageOffset') && loading) return
        setCharsToCards()
    
        console.log("countOfEndOfPage: " + countOfEndOfPage);
    }, [countOfEndOfPage])

    const debouncedOnScroll = debounce(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setCountEndOfPage((prev) => prev + 1);
            console.log("Array charItemsRef: " + charItemsRef.current);
            console.log("Length charItemsRef: " + charItemsRef.current.length);
        }
        
    }, 200); 
    
    function onScroll() {
        
        // console.log(window.innerHeight + window.scrollY);
        // console.log('offsetHeight:' + document.body.offsetHeight);
        //console.log(offset);

        if (newLoading) return

        if (charsEnded) {
            window.removeEventListener("scroll", onScroll);
        }

        debouncedOnScroll()
    }



    // const loadMorechars = () => {

    //     //setNewLoading(true)
    //     setOffset(offset + 9)
    // }

    //const {id, name,  thumbnail} = chars

   
    

    //const content = !(loading || error) ? <View char={char} error={error} loading={loading} /> : null

    

    const charItems = chars.map((props) => {
    
        return <CharItem ref={charItemsRef} key={props.id} {...props} />
    })

    const charListInside = () => {
        return (
            <>
                <ul className="char__grid">
                    {/* <View char={char} error={error} loading={loading} /> */}
                    {/* {() => View(char, error, loading)} */}
                    {charItems}
                </ul>
                <button
                    style={{ display: charsEnded ? 'none' : "block" }}
                    onClick={() => {
                        setCountEndOfPage((prev) => prev + 1)
                    }}
                    disabled={newLoading}
                    className="button button__main button__long"
                >
                    <div className="inner">load more</div>
                </button>
            </>
        )
    }

    const errorMessage = error ? <ErrorMessage /> : null
    const loadingMessage = loading ? <Loading /> : null
    const content = !(loading || error) ? charListInside() : null

    return (
        <div className="char__list">
            {errorMessage}
            {loadingMessage}
            {content}
        </div> 
    )
})


export default CharList;