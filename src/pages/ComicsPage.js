import ComicsList from "../components/comicsList/ComicsList";
import AppBanner from "../components/appBanner/AppBanner";
import Helmet from "react-helmet";

export default function ComicsPage() {
    return (
        <>
            <Helmet>
                <title>Comics page marvel</title>
                <meta name="description" content="Comics list" />
            </Helmet>
            <AppBanner />
            <ComicsList />
        </>
    )
}
