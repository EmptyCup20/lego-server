import { Controller } from 'egg';

/**
 * @Author: xiangxiao3
 * @Date: 2020-02-17 20:36:24
 * @Desc: this.repo.git, ['src', 'pages']
 */
export default class GithubController extends Controller {
  public async getRepoNodesByPath() {
    const { ctx } = this;

    const { git, sha, access_token } = ctx.request.body;
    const [ owner, repo ] = git
      .match(/[^\\/]+\/[^\\/]+(?=[.+\\.])/)[0]
      .split('/');

    try {
      const temp = await ctx.service.github.getTreeBySha(owner, repo, sha, access_token);
      ctx.body = temp.data.tree;
    } catch (e) {
      ctx.body = e;
    }
  }
  public async getContent() {
    const { ctx } = this;
    const { git, sha, access_token } = this.ctx.request.body;
    const [ owner, repo ] = git
      .match(/[^\\/]+\/[^\\/]+(?=[.+\\.])/)[0]
      .split('/');

    // async function getContent(owner, repo, path, token) {
    // octokit.authenticate({type: 'oauth', token})

    try {
      const result = await ctx.service.github.getBlob(
        owner,
        repo,
        sha,
        access_token,
      );

      ctx.body = result.data.content;
    } catch (e) {
      ctx.body =
        '(FILE) - ' + owner + '/' + repo + '/' + sha + ' does not exist';
    }
  }
  public async getFileTree() {
    const { ctx } = this;
    const { git, vuelocation, access_token } = ctx.request.body;
    const [ owner, repo ] = git
      .match(/[^\\/]+\/[^\\/]+(?=[.+\\.])/)[0]
      .split('/');
    const paths = vuelocation.split('/');

    try {
      const result = await ctx.service.github.getTreeBySha(
        owner,
        repo,
        'master',
        access_token,
      );

      let root = result.data.tree;

      for (const sha of paths) {
        for (const node of root) {
          if (node.path === sha) {
            const temp = await ctx.service.github.getTreeBySha(owner, repo, node.sha, access_token);
            root = temp.data.tree;
            break;
          }
        }
      }

      ctx.body = root;
    } catch (e) {
      ctx.body = e;
    }
  }
}
