import { Controller } from 'egg';

export default class ProjectController extends Controller {
  public async list() {
    const { ctx } = this;
    ctx.body = await ctx.service.project.getList();
  }
}
