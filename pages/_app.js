import Layout from "../Components/layout/Layout";
import "../styles/globals.css";
import { useState } from "react";
import Router from "next/router";
import Head from "next/head";
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
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
                    integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
                    crossorigin="anonymous"
                    referrerpolicy="no-referrer"
                />
            </Head>
            {isLoading ? <Layout><Loading /></Layout> : <Layout><Component {...pageProps} /></Layout>}
        </>
    );
}

export default MyApp;
