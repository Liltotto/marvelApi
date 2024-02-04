import axios from "axios";

import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

    const {loading, error, request, clearError} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _aniKey = 'apikey=d60518144fc19c1f256d76330f8ac48c'

    const _baseOffset = 210

    // const getResource = async (url) => {
    //     const res = await axios.get(url)
    //     return res
    // }

    const getAllCharacters = async () => {
        const result = await request(`${_apiBase}characters?${_aniKey}`)
        return result.data.data.results.map(_transformCharacter)
        //return result
    }

    const getSomeCharacters = async (limit, offset = _baseOffset) => {
        const result = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_aniKey}`)
        return result.data.data.results.map(_transformCharacter)
        //return result
    }

    const getCharacter = async (id) => {
        const result = await request(`${_apiBase}characters/${id}?${_aniKey}`)        
        return _transformCharacter(result.data.data.results[0])
    }

    const getCharacterByName = async (name) => {
        const result = await request(`${_apiBase}characters?name=${name}&${_aniKey}`)
        return result.data.data.results.map(_transformCharacter)
        //return result
    }

    const getSomeComics = async (limit, offset = _baseOffset) => {
        const result = await request(`${_apiBase}comics?orderBy=issueNumber&limit=${limit}&offset=${offset}&${_aniKey}`)
        return result.data.data.results.map(_transformComic)
    }  

    const getComic = async (id) => {
        const result = await request(`${_apiBase}comics/${id}?${_aniKey}`)
        return _transformComic(result.data.data.results[0])
    }  

    const _transformCharacter = (char) => {
        return{
            id: char.id,
            name: char.name,
            description: char.description ? char.description : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            price: comic.prices[0].price ? `${comic.prices[0].price}$` : 'not available',
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            homepage: comic.urls[0].url,
            pageCount: comic.pageCount ? `${comic.pageCount} p.` : 'No information about the number of pages',
            language: comic.textObjects[0]?.language ||'en-us',
            description: comic.textObjects[0]?.text || 'There is no description for this comic'
        }  
    }


    return {loading, error, clearError, getAllCharacters, getSomeCharacters, getCharacter, getCharacterByName, getSomeComics, getComic}
}

export default useMarvelService