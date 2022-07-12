import {appendFileSync} from 'fs';
import { dirname, resolve } from 'path';

export default {
  entry: './src/index.js',
  output: {
    path: resolve(dirname('dist')),
    filename: 'bundle.js',
  },
  devtool: 'eval-source-map',
  resolve: {
    fallback: {
      buffer: false,
      crypto: false,
      fs: false,
      http: false,
      https: false,
      net: false,
      os: false,
      path: false,
      querystring: false,
      stream: false,
      tls: false,
      util: false,
      url: false,
      zlib: false,
    },
  },
};
