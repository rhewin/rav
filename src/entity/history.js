import Queries from '../entity/queries.js';

export default class History {
  constructor() {
    this.q = new Queries('histories');
  }

  async add(input) {
    return await this.q.addRecord(input);
  }
}
