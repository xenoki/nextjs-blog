import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Get the current working directory of the nodejs process
// console.log(process.cwd());

const postDirectory = path.join(process.cwd(), 'posts');
export type MdMetaData = {
  title: string;
  date: string;
};
export interface Post {
  id: string;
  title: string;
  date: string;
}
const url = 'https://jsonplaceholder.typicode.com/posts';
/**
 * Get post data from and external source api
 * @returns
 */
export async function getPostsDataAPI() {
  // NOTE:  Next.js polyfills fetch() on both the client and server. You don't need to import it.
  const res = await fetch(url);
  const data = await res.json();
  //   console.log({ res, data });
  return data;
}
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postDirectory);
  // Returns an array that looks like this:
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
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}
export type PostIds = ReturnType<typeof getAllPostIds>;

export async function getPostData(id: string) {
  // id, will be the name of our markdown file
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post meta section
  const matterResult = matter(fileContents);

  console.log({ matterResult });
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();
  console.log({ contentHtml });

  //  Combine the data with the id and contentHML
  return {
    id,
    contentHtml,
    ...(matterResult.data as MdMetaData),
  };
}
export function getSortedPostsData() {
  // NOTE: Get file names under /posts, by using readdirSync to read all the content of
  // a directory

  const fileNames = fs.readdirSync(postDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remote ".md" from file name to get id using the filename
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postDirectory, fileName);
    const fileContent = fs.readFileSync(fullPath, 'utf-8');

    // Use gray-matter to parse the post meta section
    const matterResult = matter(fileContent);

    // NOTE: Combine the data with the id
    const post = {
      id,
      ...(matterResult.data as MdMetaData),
    };

    // console.log({
    //   id,
    //   fullPath,
    //   fileContent,
    //   matterResult,
    //   //   allPostsData,
    //   post,
    // });

    return post;
  });

  // console.log({ postDirectory, fileNames, allPostsData });

  // NOTE: Sort by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}
