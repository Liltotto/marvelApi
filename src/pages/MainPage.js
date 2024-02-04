//import AppHeader from "../appHeader/AppHeader";
import AppBanner from "../components/appBanner/AppBanner";
import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";

import decoration from '../resources/img/vision.png';


import { useState } from "react";
import CharSearch from "../components/charSearch/CharSearch";
import Helmet from "react-helmet";



export default function MainPage() {




    return (
        <>
            <Helmet>
                <title>Main page marvel</title>
                <meta name="description" content="Random character, cards of characters and ability to search some character" />
            </Helmet>
            <RandomChar />
            <div className="char__content">

                <CharList />
                <div className="infoAndSearch">
                    <CharInfo />
                    <CharSearch />
                </div>

            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>


    )
}


