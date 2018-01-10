// 获取Url参数
export default {
  isArrayEmpty(arr) {
    return (arr === null || arr === undefined || arr.length === 0);
  },
  isValidElement(item) {
    return !(item === null || item === undefined || item === '' || item === 'undefined');
  },
  isValidId(id) {
    return !(id === null || id === undefined || id === '' || id <= 0);
  },
};
