// import { useState, useEffect } from 'react';
// import MarvelService from '../../services/MarvelService';
// import ErrorMessage from '../error/ErrorMessage';
// import Loading from '../loading/Loading';

import './charItem.scss';

import { useContext } from 'react';
import { CharId } from '../../context/context';

const CharItem = ({id, name, thumbnail}) => {

    const {setCharId} = useContext(CharId)

  
    const nameCorrected= name.length > 25 ? name.slice(0, 25) + '...' : name
    const styleForNotFound = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'fill'} : null

    return (
        <li className="char__item" onClick={()=>setCharId(id)}>
            <img style={styleForNotFound} src={thumbnail} alt="thumbnail" />
            <div className="char__name">{nameCorrected}</div>
        </li>
    );
};

export default CharItem;