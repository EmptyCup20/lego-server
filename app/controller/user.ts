import { Controller } from 'egg';

export default class UserController extends Controller {
  public async getUserList() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.find();
  }
  public async login() {
    const { ctx } = this;
    const query = ctx.query;

    const user = await ctx.service.user.testUser(query);
    if (user) {
      ctx.body = user;
    } else {
      ctx.body = 'error';
      // TODO: 错误判断
    }
  }
}
