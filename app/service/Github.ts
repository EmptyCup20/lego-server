import { Service } from 'egg';
import { Octokit } from '@octokit/rest';

// API：https://octokit.github.io/rest.js/v17

/**
 * @Author: xiangxiao3
 * @Date: 2020-03-17 17:04:33
 * @Desc: 获取项目树 信息
 */
const getTree = async (
  owner: string,
  repo: string,
  sha: string,
  access_token: string,
) => {
  const octokit = new Octokit({
    auth: access_token ? 'token ' + access_token : '',
  });

  const result: any = await octokit.git.getTree({
    owner,
    repo,
    tree_sha: sha,
  });
  return result.data.tree;
};

/**
 * @Author: xiangxiao3
 * @Date: 2020-03-17 17:12:27
 * @Desc:
 */
export default class GithubService extends Service {
  public async getTreeByNode() {
    const { ctx } = this;
    const { git, sha, access_token } = ctx.request.body;
    const [ owner, repo ] = git
      .match(/[^\\/]+\/[^\\/]+(?=[.+\\.])/)[0]
      .split('/');

    return await getTree(owner, repo, sha, access_token);
  }

  public async getFileTree() {
    const { ctx } = this;
    const { git, vuelocation, access_token } = ctx.request.body;
    const [ owner, repo ] = git
      .match(/[^\\/]+\/[^\\/]+(?=[.+\\.])/)[0]
      .split('/');
    const paths = vuelocation.split('/');

    let root = await getTree(owner, repo, 'master', access_token);

    for (const sha of paths) {
      for (const node of root) {
        if (node.path === sha) {
          root = await getTree(owner, repo, node.sha, access_token);
          break;
        }
      }
    }
    return root;
  }

  public async getBlob() {
    const { ctx } = this;
    const { git, sha, access_token } = ctx.request.body;
    const [ owner, repo ] = git
      .match(/[^\\/]+\/[^\\/]+(?=[.+\\.])/)[0]
      .split('/');
    const octokit = new Octokit({
      auth: access_token ? 'token ' + access_token : '',
    });
    const result = await octokit.git.getBlob({ owner, repo, file_sha: sha });
    return result.data.content;
  }

  public async createOrUpdateFile(
    content: string,
  ) {
    const { ctx } = this;
    const {
      git,
      access_token,
      committer,
      path,
      commitMsg,
    } = ctx.request.body;
    const [ owner, repo ] = git
      .match(/[^\\/]+\/[^\\/]+(?=[.+\\.])/)[0]
      .split('/');
    const message: string = commitMsg || 'feat: add a file';

    const octokit = new Octokit({
      auth: access_token ? 'token ' + access_token : '',
    });
    return await octokit.repos.createOrUpdateFile({
      owner,
      repo,
      path,
      message,
      content,
      committer,
      author: committer,
    });
  }
}
