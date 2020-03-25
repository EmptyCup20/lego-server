import { Controller } from 'egg';
import { IFile } from '../model/file';

export default class FileController extends Controller {
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:46:47
   * @Desc: 查找资源列表
   */
  public async list() {
    const { ctx } = this;
    const { pagesize, pageno } = ctx.request.query;
    ctx.body = await ctx.service.file.find(
      parseInt(pagesize),
      parseInt(pageno),
    );
  }
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:46:59
   * @Desc: 查找资源总数
   */
  public async listCount() {
    const { ctx } = this;
    ctx.body = await ctx.service.file.findCount();
  }
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:47:21
   * @Desc: 根据名称查找资源
   */
  public async find() {
    const { ctx } = this;
    const { key } = ctx.request.query;
    ctx.body = await ctx.service.file.findByName(key);
  }
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:47:36
   * @Desc: 添加资源
   */
  public async add() {
    const { ctx } = this;
    const file: IFile = ctx.request.body;

    const url = await ctx.service.file.saveFileToRemote(file.content);
    file.url = url;
    delete file.content;

    const files = await ctx.service.file.add(file);
    ctx.body = files[0];
  }
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:47:45
   * @Desc: 更爱你资源
   */
  public async update() {
    const { ctx } = this;
    const file: IFile = ctx.request.body;

    if (file.content) {
      const url = await ctx.service.file.saveFileToRemote(file.content);
      file.url = url;
      delete file.content;
    }

    if (file._id) {
      ctx.body = await ctx.service.file.update(file._id, file);
    } else {
      // TODO: 错误判断
    }
  }
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:47:52
   * @Desc: 删除资源
   */
  public async remove() {
    const { ctx } = this;
    const file: IFile = ctx.request.body;

    ctx.body = await ctx.service.file.remove(file._id);
  }
  /**
   * @Author: xiangxiao3
   * @Date: 2020-03-25 17:48:03
   * @Desc: 获取资源内容
   */
  public async getContent() {
    const { ctx } = this;
    const { url } = ctx.request.query;

    const data = await ctx.service.file.getFileContent(url);
    ctx.body = data;
  }
}
