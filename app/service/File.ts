import { Service } from 'egg';
import { IFile } from '../model/File';
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
  public async add(file: IFile) {
    return await this.ctx.model.File.insertMany(file);
  }
  public async findOne(pro: Record<string, any>) {
    return await this.ctx.model.File.findOne(pro);
  }
  public async update(id: string, file: IFile) {
    return await this.ctx.model.File.updateOne({ _id: id }, file);
  }
  public async remove(id: string) {
    return await this.ctx.model.File.remove({ _id: id });
  }
  // TODO: 错误判断
  public async saveFileToRemote(content: string) {
    const { ctx } = this;
    // https://eggjs.org/zh-cn/core/httpclient.html
    const result = await ctx.curl('http://118.24.45.50:7000/', {
      method: 'POST',
      data: { text: content },
      dataType: 'text',
    });
    // 'Click <a href="https://xxtest-1255332399.cos.ap-shanghai.myqcloud.com//96e79218">https://xxtest-1255332399.cos.ap-shanghai.myqcloud.com//96e79218</a>'
    // to https://xxtest-1255332399.cos.ap-shanghai.myqcloud.com//96e79218
    return result.data.match(/(?<=\>).*(?=\<\/a\>)/)[0];
  }
  // TODO: 错误判断
  public async getFileContent(url: string) {
    const { ctx } = this;
    // https://eggjs.org/zh-cn/core/httpclient.html
    const result = await ctx.curl(url, {
      dataType: 'text',
    });
    return result.data;
  }
}
