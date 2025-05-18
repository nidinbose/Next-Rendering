import initMiddleware from './init-middleware';

import Cors from 'cors'

const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  origin: 'https://next-rendering-ashy.vercel.app', 
  credentials: true,
  allowedHeaders: ['Content-Type'],
});

export default initMiddleware(cors);
