import { Service } from 'egg';

/**
 * Test Service
 */
export default class FileService extends Service {
  /**
   * find user list
   */
  public async find() {
    return await this.ctx.model.File.find();
  }
}
