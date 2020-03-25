import { Service } from 'egg';
import { IProject } from '../model/Project';

/**
 * Test Service
 */
export default class ProjectService extends Service {
  /**
   * getUser to you
   */
  public async list(type: string, pagesize = 5, pageno = 1) {
    return await this.ctx.model.Project.find({ type })
      .sort({ lastModify: -1 })
      .limit(pagesize)
      .skip(pagesize * (pageno - 1));
  }
  public async listTotal(type: string) {
    return await this.ctx.model.Project.find({ type }).count();
  }
  public async findlistByUser(
    userId: string,
    type: string,
    pagesize = 5,
    pageno = 1,
  ) {
    return await this.ctx.model.Project.find({ userId, type })
      .sort({ lastModify: -1 })
      .limit(pagesize)
      .skip(pagesize * (pageno - 1));
  }
  public async findlistTotalByUser(userId: string, type: string) {
    return await this.ctx.model.Project.find({ userId, type }).count();
  }
  public async add(pro: IProject) {
    return await this.ctx.model.Project.insertMany(pro);
  }
  public async findOne(pro: Record<string, any>) {
    return await this.ctx.model.Project.findOne(pro);
  }
  public async update(id: string, pro: IProject) {
    return await this.ctx.model.Project.updateOne({ _id: id }, pro);
  }
  public async remove(id: string) {
    return await this.ctx.model.Project.remove({ _id: id });
  }
}
