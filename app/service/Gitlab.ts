import { Service } from 'egg';
const GITLABURL = 'https://gitlab.com/api/v4';

/**
 * @Author: xiangxiao3
 * @Date: 2020-03-17 17:12:27
 * @Desc:
 */
export default class GitlabService extends Service {
  public async getTreeByNode() {
    const { ctx } = this;
    const { git, access_token, path } = ctx.request.body;
    const [ owner, repo ] = git
      .match(/[^\\/]+\/[^\\/]+(?=[.+\\.])/)[0]
      .split('/');

    const result = await ctx.curl(
      GITLABURL +
        '/projects/' +
        owner +
        '%2F' +
        repo +
        '/repository/tree?path=' +
        path,
      {
        dataType: 'json',
        auth: 'PRIVATE-TOKEN: ' + access_token,
      },
    );
    return result.data;
  }

  public async getFileTree() {
    const { ctx } = this;
    const { git, vuelocation, access_token } = ctx.request.body;
    const [ owner, repo ] = git
      .match(/[^\\/]+\/[^\\/]+(?=[.+\\.])/)[0]
      .split('/');
    const paths = vuelocation.split('/').join('%2F');

    const result = await ctx.curl(
      GITLABURL +
        '/projects/' +
        owner +
        '%2F' +
        repo +
        '/repository/tree?path=' +
        paths,
      {
        dataType: 'json',
        auth: 'PRIVATE-TOKEN: ' + access_token,
      },
    );
    return result.data;
  }

  public async getBlob() {
    const { ctx } = this;
    const { git, id, access_token } = ctx.request.body;
    const [ owner, repo ] = git
      .match(/[^\\/]+\/[^\\/]+(?=[.+\\.])/)[0]
      .split('/');
    const result = await ctx.curl(
      GITLABURL +
        '/projects/' +
        owner +
        '%2F' +
        repo +
        '/repository/blobs/' +
        id,
      {
        dataType: 'json',
        auth: 'PRIVATE-TOKEN: ' + access_token,
      },
    );
    return result.data.content;
  }

  public async createOrUpdateFile(content: string) {
    const { ctx } = this;
    const { git, access_token, committer, path, commitMsg } = ctx.request.body;
    const [ owner, repo ] = git
      .match(/[^\\/]+\/[^\\/]+(?=[.+\\.])/)[0]
      .split('/');
    const message: string = commitMsg || 'feat: add a file';

    const result = await ctx.curl(
      GITLABURL +
        '/projects/' +
        owner +
        '%2F' +
        repo +
        '/repository/files/' +
        path.replace(/\//g, '%2F'),
      {
        dataType: 'json',
        contentType: 'application/json',
        method: 'POST',
        auth: 'PRIVATE-TOKEN: ' + access_token,
        headers: {
          'content-type': 'application/json',
        },
        data: {
          branch: 'master',
          author_email: committer.email,
          author_name: committer.name,
          content,
          commit_message: message,
        },
      },
    );
    return result.data;
  }
}
