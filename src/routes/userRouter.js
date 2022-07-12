import User from '../entity/user.js';

export default function userRouter (router) {
  let user = new User();
  router.get('/users', user.apiHandlerListUser());
}
