// 获取Url参数
export default {
    isArrayEmpty: function (arr) {
        return (arr === null || arr === undefined || arr.length === 0);
    },
    isValidElement: function (item) {
        return !(item === null || item === undefined || item === "" || item === "undefined");
    },
    isValidId: function (id) {
        return !(id === null || id === undefined || id === "" || id <= 0);
    }
}