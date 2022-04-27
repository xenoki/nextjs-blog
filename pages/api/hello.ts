import { Http2ServerRequest, Http2ServerResponse } from 'http2';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Do Not Fetch an API Route from getStaticProps or getStaticPaths
 * You should not fetch an API Route from getStaticProps or getStaticPaths.
 * Instead, write your server-side code directly in getStaticProps or getStaticPaths (or call a helper function).
 * req = HTTP incoming message, res = HTTP server response
 * They can be deployed as Serverless Functions (also known as Lambdas).
 *
 * Good use case is form input
 * @param req
 * @param res
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ text: 'Hello' });
}
