import { Service } from 'egg';
import { IUser } from '../model/User';

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

  public async testUser(user: IUser) {
    return await this.ctx.model.User.findOne(user);
  }
}
