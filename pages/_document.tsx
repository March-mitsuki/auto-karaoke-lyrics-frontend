import { Html, Head, Main, NextScript } from 'next/document';

const MyDocument = () => {
    return (
        <Html lang='zh'>
            <Head>
                <meta name='Auto Karaoke Lyrics' content='A tool that plays karaoke lyrics automatically.' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default MyDocument;