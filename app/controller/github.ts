import { Controller } from 'egg';
import { IFile } from '../model/file';

/**
 * @Author: xiangxiao3
 * @Date: 2020-02-17 20:36:24
 * @Desc: this.repo.git, ['src', 'pages']
 */
export default class GithubController extends Controller {
  public async getRepoNodesByPath() {
    const { ctx } = this;

    const { type } = ctx.request.body;
    const gitService =
      type === 'github' ? ctx.service.github : ctx.service.gitlab;

    try {
      ctx.body = await gitService.getTreeByNode();
    } catch (e) {
      ctx.body = e;
    }
  }
  public async getContent() {
    const { ctx } = this;
    const { type } = this.ctx.request.body;
    const gitService =
      type === 'github' ? ctx.service.github : ctx.service.gitlab;

    try {
      const result = await gitService.getBlob();

      ctx.body = result;
    } catch (e) {
      ctx.body = e;
    }
  }
  public async getFileTree() {
    const { ctx } = this;
    const { type } = ctx.request.body;
    const gitService =
      type === 'github' ? ctx.service.github : ctx.service.gitlab;

    try {
      ctx.body = await gitService.getFileTree();
    } catch (e) {
      ctx.body = e;
    }
  }

  public async pushFile() {
    const { ctx } = this;
    const { fileId, type } = ctx.request.body;

    const gitService =
      type === 'github' ? ctx.service.github : ctx.service.gitlab;

    try {
      const files: IFile[] = await ctx.service.file.findById(fileId);
      const content: string = await ctx.service.file.getFileContent(
        files[0].url,
      );

      const result = await gitService.createOrUpdateFile(content);
      ctx.body = result;
    } catch (e) {
      ctx.body = e;
    }
  }
}
