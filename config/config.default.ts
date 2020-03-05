import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1581507600692_1134';

  // 默认不建议关闭，开发态先关闭
  // 可以参考 https://blog.csdn.net/weixin_43704471/article/details/90763103
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // add your egg config in here
  config.middleware = [];

  // add mongo egg config
  config.mongoose = {
    // url: 'mongodb://localhost:27017/lego',
    url: process.env.EGG_MONGODB_URL || 'mongodb://118.24.45.50:27017/lego',
    options: {},
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
