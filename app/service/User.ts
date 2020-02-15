import { Service } from 'egg';

/**
 * Test Service
 */
export default class UserService extends Service {
  /**
   * find user list
   */
  public async find() {
    return await this.ctx.model.User.find();
  }
}
