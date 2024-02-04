import AppHeader from "../appHeader/AppHeader";
//import { MainPage, ComicsPage, SingleComicPage, Page404 } from "../../pages";
import { CharId } from "../../context/context";
import { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "../loading/Loading";

const MainPage = lazy(() => import('../../pages/MainPage'))
const ComicsPage = lazy(() => import('../../pages/ComicsPage'))
const SingleComicPage = lazy(() => import('../../pages/SingleComicPage'))
const Page404 = lazy(() => import('../../pages/Page404'))
const SingleCharPage = lazy(() => import('../../pages/SingleCharPage'))


const App = () => {

    const [charId, setCharId] = useState(null)

    return (
        <CharId.Provider value={{
            charId,
            setCharId
        }}>

            <Router>
                <div className="app">
                    <AppHeader />
                    <main>
                        <Suspense fallback={<Loading />}>
                            <Routes>
                                
                                <Route path="/" element={<MainPage />} />
                                <Route path="/:charId" element={<SingleCharPage />} />
                                <Route path="/comics" element={<ComicsPage />} />             
                                <Route path="/comics/:comicId" element={<SingleComicPage />} />
                                <Route path="*" element={<Page404 />} />
                            </Routes>
                            {/* <MainPage />
                    <ComicsPage /> */}
                        </Suspense>
                    </main>
                </div>
            </Router>

        </CharId.Provider>




    )
}

export default App;