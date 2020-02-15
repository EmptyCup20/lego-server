import { Service } from 'egg';

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
}
