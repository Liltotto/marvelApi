import './charItem.scss';

import PropTypes from 'prop-types';

import { forwardRef, useContext, useState } from 'react';
import { CharId } from '../../context/context';
const CharItem = forwardRef(function CharItem({id, name, thumbnail}, ref) {

    const {setCharId} = useContext(CharId)

    const [cardClassName, setCardClassName] = useState('char__item')

    const setRef = (element) => {
        
        for (const element of ref.current) {
            if(element.id == id) return 
        }
        if(element) {
            ref.current.push(element)
            console.log('objectRef' + element);
        }
    }

    const cardClickHandler = () => {
        setCharId(id)

        for (const element of ref.current) {
            if(element.id == id) {
                element.classList.add('char__item_selected')
            }
            else element.classList.remove('char__item_selected')
        }
    }

     

    const nameCorrected= name.length > 25 ? name.slice(0, 25) + '...' : name
    const styleForNotFound = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'fill'} : null

    return (
        <li className={cardClassName} id={id} ref={setRef} onClick={cardClickHandler}>
            <img style={styleForNotFound} src={thumbnail} alt="thumbnail" />
            <div className="char__name">{nameCorrected}</div>
        </li>
    );
})

CharItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    thumbnail: PropTypes.string
}

export default CharItem;