import { PropsWithChildren } from 'react';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

type Route = {
  params: {
    id: string;
  };
};
type PostData = {
  date: string;
  title: string;
  id: string;
};

// NextJs server side will get the path, this is where we can get it from local or api
export async function getStaticPaths() {
  // This will get all the post path from post directory
  const paths = getAllPostIds();

  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

  return {
    paths,
    fallback: false,
  };
}

// NextJs server will process the content to pass to the React props functional component
export async function getStaticProps({ params }: Route) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

// type PostProps = PropsWithChildren<ReturnType<typeof getStaticProps>>;

type PostProps = PropsWithChildren<{
  postData: {
    id: string;
    title: string;
    date: string;
    contentHtml: string;
  };
}>;

export default function Post(props: PostProps) {
  const { postData } = props;
  return (
    <Layout>
      <Head key={postData.id}>
        <title>{postData.title}</title>
      </Head>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {/* {postData.date} */}
      <div className='text-white'>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
