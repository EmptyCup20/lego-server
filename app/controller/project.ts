import { Controller } from 'egg';
import { IProject } from '../model/project';

export default class ProjectController extends Controller {
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:17:17
   * @Desc: 根据git类型查询项目
   */
  public async list() {
    const { ctx } = this;
    const { pagesize, pageno, type } = ctx.request.query;
    ctx.body = await ctx.service.project.list(type, parseInt(pagesize), parseInt(pageno));
  }
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:17:44
   * @Desc: 根据git类型查询项目总数
   */
  public async listCount() {
    const { ctx } = this;
    const { type } = ctx.request.query;
    ctx.body = await ctx.service.project.listTotal(type);
  }
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:18:01
   * @Desc: 根据用户获取项目列表
   */
  public async findlistByUser() {
    const { ctx } = this;
    const { userId, pagesize, pageno, type } = ctx.request.query;
    ctx.body = await ctx.service.project.findlistByUser(
      userId,
      type,
      parseInt(pagesize),
      parseInt(pageno),
    );
  }
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:18:26
   * @Desc: 根据用户获取项目总数
   */
  public async findlistCountByUser() {
    const { ctx } = this;
    const { userId, type } = ctx.request.query;
    ctx.body = await ctx.service.project.findlistTotalByUser(
      userId,
      type,
    );
  }
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:19:30
   * @Desc: 添加项目
   */
  public async add() {
    const { ctx } = this;
    const pro: IProject = ctx.request.body;
    pro.type = pro.git.match(/github/) ? 'github' : 'gitlab';
    pro.createTime = new Date();
    pro.lastModify = new Date();

    ctx.body = await ctx.service.project.add(pro);
  }
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:19:38
   * @Desc: 更新项目
   */
  public async update() {
    const { ctx } = this;
    const pro: IProject = ctx.request.body;

    if (pro._id) {
      ctx.body = await ctx.service.project.update(pro._id, pro);
    } else {
      // TODO: 错误判断
    }
  }
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:19:43
   * @Desc: 删除项目
   */
  public async remove() {
    const { ctx } = this;
    const pro: IProject = ctx.request.body;

    ctx.body = await ctx.service.project.remove(pro._id);
  }
}
