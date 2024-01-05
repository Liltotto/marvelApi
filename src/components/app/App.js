import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

import { CharId } from "../../context/context";
import { useRef, useState } from "react";



const App = () => {

    const [charId, setCharId] = useState(null)

    const charInfoRef = useRef(null)

    return (
        <CharId.Provider value={{
            charId,
            setCharId
            }}>
            <div className="app">
                <AppHeader />
                <main>
                    <RandomChar />
                    <div className="char__content">
                        <CharList />
                        <CharInfo />
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        </CharId.Provider>

    )
}

export default App;