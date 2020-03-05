import { Controller } from 'egg';
import { IProject } from '../model/project';

export default class ProjectController extends Controller {
  public async list() {
    const { ctx } = this;
    ctx.body = await ctx.service.project.list();
  }

  public async add() {
    const { ctx } = this;
    const pro: IProject = ctx.request.body;

    ctx.body = await ctx.service.project.add(pro);
  }

  public async update() {
    const { ctx } = this;
    const pro: IProject = ctx.request.body;

    if (pro._id) {
      ctx.body = await ctx.service.project.update(pro._id, pro);
    } else {
      // TODO: 错误判断
    }
  }
  public async remove() {
    const { ctx } = this;
    const pro: IProject = ctx.request.body;

    ctx.body = await ctx.service.project.remove(pro._id);
  }
}
