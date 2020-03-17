import { Controller } from 'egg';
import { IProject } from '../model/project';

export default class ProjectController extends Controller {
  public async list() {
    const { ctx } = this;
    const { pagesize, pageno } = ctx.request.query;
    ctx.body = await ctx.service.project.list(parseInt(pagesize), parseInt(pageno));
  }
  public async findlistByUser() {
    const { ctx } = this;
    const { userId, pagesize, pageno } = ctx.request.query;
    ctx.body = await ctx.service.project.findlistByUser(
      userId,
      parseInt(pagesize),
      parseInt(pageno),
    );
  }

  public async add() {
    const { ctx } = this;
    const pro: IProject = ctx.request.body;
    pro.type = pro.git.match(/github/) ? 'github' : 'gitlab';
    pro.createTime = new Date();
    pro.lastModify = new Date();

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
