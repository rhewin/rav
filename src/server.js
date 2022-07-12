'use strict';

import express from 'express';

export default function server() {
  const app = express()
  app.use(express.json());
  return app
}
