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

  public async user() {
    const { ctx } = this;
    const body = ctx.request.body;
    const res = await ctx.service.user.findOne(body.name, body.type);
    if (!res) {
      await ctx.service.user.add(body);
      ctx.body = {
        code: 0,
        msg: 'success',
        data: null,
      };
    } else {
      ctx.body = {
        code: 0,
        msg: 'success',
        data: res,
      };
    }
  }
}
