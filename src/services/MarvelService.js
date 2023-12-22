import axios from "axios";

class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _aniKey = 'apikey=d60518144fc19c1f256d76330f8ac48c'

    _baseOffset = 210

    getResource = async (url) => {
        const res = await axios.get(url)
        return res
    }

    getAllCharacters = async () => {
        const result = await this.getResource(`${this._apiBase}characters?${this._aniKey}`)
        return result.data.data.results.map(this._transformCharacter)
        //return result
    }

    getSomeCharacters = async (limit, offset = this._baseOffset) => {
        const result = await this.getResource(`${this._apiBase}characters?limit=${limit}&offset=${offset}&${this._aniKey}`)
        return result.data.data.results.map(this._transformCharacter)
        //return result
    }

    getCharacter = async (id) => {
        const result = await this.getResource(`${this._apiBase}characters/${id}?${this._aniKey}`)        
        return this._transformCharacter(result.data.data.results[0])
    }

    _transformCharacter = (char) => {
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
}

export default MarvelService