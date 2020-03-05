import { Service } from 'egg';
import { IProject } from '../model/Project';

/**
 * Test Service
 */
export default class ProjectService extends Service {
  /**
   * getUser to you
   */
  public async list() {
    return await this.ctx.model.Project.find();
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
