'use strict';

import server from './server.js';
import {PORT, HOST} from './constant.js';
import rateLimit from 'express-rate-limit';
import router from './routes/router.js';

const app = server();

app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // per 1 minute
    max: 30,
    message: 'You exceeded 30 requests per minute limit!',
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.use(router);
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
