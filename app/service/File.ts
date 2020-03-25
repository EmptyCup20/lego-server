import { Service } from 'egg';
import { IFile } from '../model/File';
/**
 * Test Service
 */
export default class FileService extends Service {
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:44:22
   * @Desc:  获取资源列表
   */
  public async find(pagesize = 5, pageno = 1) {
    return await this.ctx.model.File.find()
      .sort({ views: -1 })
      .limit(pagesize)
      .skip(pagesize * (pageno - 1));
  }
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:44:52
   * @Desc: 获取资源总数
   */
  public async findCount() {
    return await this.ctx.model.File.find().count();
  }
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:45:03
   * @Desc: 根据名称查找文件
   */
  public async findByName(key: string) {
    return await this.ctx.model.File.find({ name: new RegExp(key) });
  }
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:45:28
   * @Desc: 添加资源文件
   */
  public async add(file: IFile) {
    return await this.ctx.model.File.insertMany(file);
  }
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:45:36
   * @Desc: 找到文件
   */
  public async findOne(pro: Record<string, any>) {
    return await this.ctx.model.File.findOne(pro);
  }
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:45:42
   * @Desc: 更新文件
   */
  public async update(id: string, file: IFile) {
    return await this.ctx.model.File.updateOne({ _id: id }, file);
  }
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:45:48
   * @Desc: 删除文件
   */
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
