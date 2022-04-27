import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData, Post, getPostsDataAPI } from '../lib/posts';
import { PropsWithChildren } from 'react';
import Link from 'next/link';
import Date from '../components/date';

// NextJS static rendering, we can get this from a external api too
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  // console.log({ allPostsData });
  return {
    props: {
      allPostsData,
    },
  };
}

// NOTE: Server side rendering
// export async function getServerSideProps(context) {
//   const data = await getPostsDataAPI();
//   console.log(data);
//   return {
//     props: {
//       // props for the component
//       data,
//     },
//   };
// }

export default function Home(
  props: PropsWithChildren<{ allPostsData: Post[] }>
) {
  const { allPostsData } = props;
  // console.log(allPostsData);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <meta property='og:title' content='My page title' key='title' />
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href='https://nextjs.org/learn'>our Next.js tutorial</a>.)
        </p>
      </section>
      <section className='flex flex-col'>
        <h2>Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              {/* <br />
              {id} */}
              <br />
              <small>
                <Date dateString={date} />
              </small>
              {/* {date} */}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
