import Country from '../entity/country.js';
import Auth from '../entity/core/auth.js';

export default function countryRouter(router) {
  let auth = new Auth();
  let country = new Country();
  router.get(
    '/country',
    auth.validate('verifyToken'),
    country.apiHandlerCountrySearch()
  );
}
