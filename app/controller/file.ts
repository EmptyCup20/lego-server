import { Controller } from 'egg';
import { IFile } from '../model/file';


export default class FileController extends Controller {
  public async list() {
    const { ctx } = this;
    ctx.body = await ctx.service.file.find();
  }
  public async add() {
    const { ctx } = this;
    const file: IFile = ctx.request.body;

    const url = await ctx.service.file.saveFileToRemote(file.content);
    file.url = url;
    delete file.content;

    const files = await ctx.service.file.add(file);
    ctx.body = files[0];
  }
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
  public async remove() {
    const { ctx } = this;
    const file: IFile = ctx.request.body;

    ctx.body = await ctx.service.file.remove(file._id);
  }
  public async getContent() {
    const { ctx } = this;
    const { url } = ctx.request.query;

    const data = await ctx.service.file.getFileContent(url);
    ctx.body = data;
  }
}
