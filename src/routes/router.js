'use strict';

import server from '../server.js';
import authRouter from './authRouter.js';
import userRouter from './userRouter.js';
import countryRouter from './countryRouter.js';

const router = server();
authRouter(router);
userRouter(router);
countryRouter(router);
router.get('/', (_, res) => {
  res.send(`Welcome to the World API!`);
});

export default router;
