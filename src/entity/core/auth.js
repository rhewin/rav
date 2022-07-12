import Queries from '../queries.js';
import { header, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { JWT_TOKEN } from '../../constant.js';

export default class Auth {
  constructor() {
    this.q = new Queries('users');
  }

  async generateToken(input) {
    return jwt.sign(input, JWT_TOKEN);
  }

  validate(method) {
    switch (method) {
      case 'verifyToken': {
        return [
          header('authorization', `Token doesn't exists`).exists()
            .custom((authorization, {_, res}) => {
              try {
                console.log(authorization, 'authorization');
                const decodedJwt = jwt.verify(authorization, JWT_TOKEN);
                if (!decodedJwt.email) {
                  return res.status(400).send('Invalid Token');
                }
              } catch (err) {
                return res.status(400).send('Invalid Token');
              }
              return true;
            })
            .withMessage(`Invalid Token!`)
            .optional({ checkFalsy: true }),
          (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              res.status(400).json({ errors: errors.array() });
              return false;
            }
            return next();
          },
        ];
      }
    }
  }
}
