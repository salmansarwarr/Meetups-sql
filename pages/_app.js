import Layout from "../Components/layout/Layout";
import "../styles/globals.css";
import { useState } from "react";
import Router from "next/router";
import Loading from "../Components/Loading";
import nProgress from "nprogress";

function MyApp({ Component, pageProps }) {
    nProgress.configure({ showSpinner: false });
    const [isLoading, setIsLoading] = useState(false);

    Router.events.on("routeChangeStart", () => {
        nProgress.start();
        setIsLoading(true);
    });
    Router.events.on("routeChangeComplete", () => {
        nProgress.done();
        setIsLoading(false);
    });

    return (
        <>
            {isLoading ? <Layout><Loading /></Layout> : <Layout><Component {...pageProps} /></Layout>}
        </>
    );
}

export default MyApp;
