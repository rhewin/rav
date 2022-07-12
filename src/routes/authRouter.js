import User from '../entity/user.js';

export default function authRouter(router) {
  let user = new User();
  router.post(
    '/register',
    user.validate('registerUser'),
    user.apiHandlerRegister()
  );
  router.post(
    '/login',
    user.validate('loginUser'),
    user.apiHandlerLogin()
  );
}
