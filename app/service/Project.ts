import { Service } from 'egg';

/**
 * Test Service
 */
export default class Project extends Service {
  /**
   * getUser to you
   */
  public async getList() {
    return [
      {
        img: 'https://picsum.photos/300/200?random&date=2019-08-18',
        name: 'vue-manage-system',
        git: 'https://github.com/xxholly32/vue-manage-system.git',
        site: 'https://lin-xin.gitee.io/example/work/#/dashboard',
      },
      {
        img: 'https://picsum.photos/300/200?random&date=2019-08-18',
        name: 'vue2.0-demos',
        git: 'https://github.com/qianyinghuanmie/vue2.0-demos.git',
        site: 'https://qianyinghuanmie.github.io/vue2.0-demos/dist/#/',
      },
      {
        img: 'https://picsum.photos/300/200?random&date=2019-08-18',
        name: 'voie-example',
        git: 'https://github.com/inca/voie-example.git',
        site: 'https://voie-example.netlify.com/',
      },
      {
        img: 'https://picsum.photos/300/200?random&date=2019-08-18',
        name: 'vue-mini-shop',
        git: 'https://github.com/BosNaufal/vue-mini-shop.git',
        site: 'https://bosnaufal.github.io/vue-mini-shop/#!/',
      },
    ];
  }
}
