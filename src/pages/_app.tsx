import { Rajdhani } from 'next/font/google';
import Head from 'next/head';

import type { AppProps } from 'next/app';

import '@/styles/globals.scss';

const rajdhani = Rajdhani({
  weight: '700',
  subsets: ['latin'],
});

const App = ({ Component, pageProps }: AppProps): React.ReactNode => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <main className={rajdhani.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default App;
