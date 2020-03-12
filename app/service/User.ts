import { Service } from 'egg';
import { IUser } from '../model/User';
import { omit } from 'lodash';

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

  public async add(User: IUser) {
    return await this.ctx.model.User.insertMany(User);
  }

  public async findUser(user: IUser) {
    return await this.ctx.model.User.findOne(user);
  }

  public async updateUserInfo(user: IUser) {
    const updateInfo = omit(user, ['name', 'type', 'userId']);
    return await this.ctx.model.User.findOneAndUpdate(
      {
        name: user.name,
        type: user.type,
      },
      {
        $set: updateInfo,
      },
    );
  }
}
