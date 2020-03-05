import { Service } from 'egg';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: '719db6e02c323bc91ef78dfcbcccb15b20b3cea0',
});

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

  public async getTreeBySha(owner: string, repo: string, tree_sha: string) {
    return await octokit.git.getTree({
      owner,
      repo,
      tree_sha,
    });
  }

  public async getBlob(owner: string, repo: string, file_sha: string) {
    return await octokit.git.getBlob({ owner, repo, file_sha });
  }
}
