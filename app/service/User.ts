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

  public async findOne(username: string, type: string) {
    return await this.ctx.model.User.findOne({
      name: username,
      type,
    });
  }

  public async add(User: IUser) {
    return await this.ctx.model.User.insertMany(User);
  }

  public async testUser(user: IUser) {
    return await this.ctx.model.User.findOne(user);
  }
}
