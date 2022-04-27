import '../styles/global.css'; // You can only
import { AppProps } from 'next/app';

// Create this App top level component to enable global styles
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
