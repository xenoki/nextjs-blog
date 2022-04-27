// Component can have any names, but must export it using default, for next routing to work
// import '../../styles/global.s.css';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import { PropsWithChildren } from 'react';
import Layout from '../components/layout';

type FirstPostProps = PropsWithChildren<{}>;

export default function FirstPost({ children }: FirstPostProps) {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
        src='https://connect.facebook.net/en_US/sdk.js'
        strategy='lazyOnload'
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <h1>First Post</h1>
      <h2>
        {/* Dont use Link if you want to like it to an external page */}
        <Link href='/'>
          {/* use className on */}
          <a className='text-3xl font-bold underline'>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
}
