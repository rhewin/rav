import * as bcrypt from 'bcrypt';
import {body, check, validationResult} from 'express-validator';
import Auth from '../entity/core/auth.js';
import Queries from '../entity/queries.js';

export default class User {
  constructor() {
    this.q = new Queries('users');
  }

  async getAll() {
    return await this.q.getAllRecord();
  }

  async getByEmail(value) {
    return await this.q.getRecordbyField('email', value);
  }

  async add(input) {
    return await this.q.addRecord(input);
  }

  async update(id, input) {
    return await this.q.updateRecord(id, input);
  }
  async isExistByEmail(value) {
    const res = await this.q.getRecordbyField('email', value);
    return res.length > 0 ? true : false;
  }

  apiHandlerLogin() {
    const $this = this;
    return async function (req, res) {
      const auth = new Auth();
      const [newToken, user] = await Promise.all([
        auth.generateToken({ email: req.body.email }),
        $this.getByEmail(req.body.email),
      ]);
      const userId = user[0].id;
      await $this.update(userId, { token: newToken });

      res.json({
        data: {},
        message: `Successfully, login!`,
      });
    };
  }

  apiHandlerRegister() {
    const $this = this;
    return async function (req, res) {
      const { email, name, password } = req.body;
      $this.add({
        email,
        name,
        password: await bcrypt.hash(password, 10),
      });

      res.json({
        data: {
          email,
          name,
        },
        message: `Successfully, register!`,
      });
    };
  }

  apiHandlerListUser() {
    const $this = this;
    return async function (_, res) {
      try {
        res.json({
          data: await $this.getAll(),
          message: '',
        });
      } catch (e) {
        console.log('Error: ', e);
      }
    };
  }

  validate(method) {
    const $this = this;
    switch (method) {
      case 'registerUser': {
        return [
          body('name', `Name doesn't exists`).exists(),
          body('password', `Invalid password`).exists(),
          body('email', `Invalid email`).exists(),
          body('email', `Invalid email format`).isEmail(),
          check('email')
            .custom(async (_, { req }) => {
              const isExist = await $this.isExistByEmail(req.body.email);
              if (isExist) {
                res.status(400).send(`User is already exist!`);
                return;
              }
              return true;
            })
            .withMessage(`User is already exist!`)
            .optional({ checkFalsy: true }),
          (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              res.status(400).json({ errors: errors.array() });
              return;
            }
            return next();
          },
        ];
      }
      case 'loginUser': {
        return [
          body('email', `Invalid email`).exists(),
          body('email', `Invalid email format`).isEmail(),
          body('password', `Invalid password`).exists(),
          check('email')
            .custom(async (_, { req, res }) => {
              const isExist = await $this.isExistByEmail(req.body.email);
              if (!isExist) {
                return res.status(400).send(`User not exist!`);
              }
              return true;
            })
            .withMessage(`User not exist!`)
            .optional({ checkFalsy: true }),
          check('password')
            .custom(async (_, { req, res }) => {
              const { email, password } = req.body;
              const user = await $this.getByEmail(email);
              const passwordFromDB = user[0].password;

              if (!passwordFromDB && passwordFromDB.length === 0) {
                return res.status(400).send(`Missing password!`);
              } else {
                const result = await bcrypt.compare(password, passwordFromDB);
                if (!result) {
                  return res.status(400).send(`Wrong password!`);
                }
                return true;
              }
            })
            .withMessage(`Wrong password!`)
            .optional({ checkFalsy: true }),
          (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              res.status(400).json({ errors: errors.array() });
              return;
            }
            return next();
          },
        ];
      }
    }
  }
}
