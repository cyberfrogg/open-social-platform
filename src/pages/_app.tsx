import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '@/store'
import { Provider } from 'react-redux'
import NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <NextNProgress
                color="#8D65FF"
                options={{ showSpinner: false }}
            />
            <Component {...pageProps} />
        </Provider>
    );
}
