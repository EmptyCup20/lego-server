import { Service } from 'egg';
import { Octokit } from '@octokit/rest';

/**
 * Test Service
 */
export default class GithubService extends Service {
  /**
   * find user list
   */
  public async find() {
    return await this.ctx.model.File.find();
  }

  public async getTreeBySha(
    owner: string,
    repo: string,
    tree_sha: string,
    access_token: string,
  ) {
    const octokit = new Octokit({
      auth: 'token ' + access_token,
    });
    return await octokit.git.getTree({
      owner,
      repo,
      tree_sha,
    });
  }

  public async getBlob(
    owner: string,
    repo: string,
    file_sha: string,
    access_token: string,
  ) {
    const octokit = new Octokit({
      auth: 'token ' + access_token,
    });
    return await octokit.git.getBlob({ owner, repo, file_sha });
  }

  public async createOrUpdateFile(
    owner: string,
    repo: string,
    message: string,
    access_token: string,
    path: string,
    content: string,
    committer: any,
    author: any,
  ) {
    const octokit = new Octokit({
      auth: 'token ' + access_token,
    });
    return await octokit.repos.createOrUpdateFile({
      owner,
      repo,
      path,
      message,
      content,
      committer,
      author,
    });
  }
}
