import { Controller } from 'egg';
import { successBody, errorBody } from '../utils';
export default class UserController extends Controller {
  public async user() {
    const { ctx } = this;
    const body = ctx.request.body;
    const res = await ctx.service.user.findUser({
      name: body.name,
      type: body.type,
    });
    if (!res) {
      await ctx.service.user.add(body);
      ctx.body = successBody(null);
    } else {
      ctx.body = successBody(res);
    }
  }

  public async getUserInfo() {
    const { ctx } = this;
    const body = ctx.request.query;
    const res = await ctx.service.user.findUser({
      name: body.name,
      type: body.type,
    });
    if (res) {
      ctx.body = successBody(res);
    } else {
      ctx.body = errorBody('查询失败。');
    }
  }

  public async updateUserInfo() {
    const { ctx } = this;
    const res = await ctx.service.user.updateUserInfo(ctx.request.body);
    if (res) {
      ctx.body = successBody(res);
    } else {
      ctx.body = errorBody('更新失败。');
    }
  }
}
