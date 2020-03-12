export const successBody = (data: any) => {
  return {
    code: 0,
    msg: '操作成功。',
    data,
  };
};

export const errorBody = (msg: string, code = -1) => {
  return {
    code,
    msg,
    data: null,
  };
};
