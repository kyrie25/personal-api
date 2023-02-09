import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Kyrie's API</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}
