// 获取Url参数
export default {
  isArrayEmpty: function (arr) {
    return (arr === null || arr === undefined || arr.length === 0);
  },
  isValidElement: function (item) {
    return !(item === null || item === undefined || item === '' || item === 'undefined');
  },
  isValidId: function (id) {
    return !(id === null || id === undefined || id === '' || id <= 0);
  },
  getQueryString: function () {
    //url例子：XXX.aspx?ID=" + ID + "&Name=" + Name；  

    var url = location.search; //获取url中"?"符以及其后的字串  

    var theRequest = new Object();

    if (url.indexOf("?") != -1)//url中存在问号，也就说有参数。  
    {

      var str = url.substr(1);

      var strs = str.split("&");

      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }

    return theRequest;
  },
  toQueryString: function(obj) {
    if ((obj === null || obj === undefined || obj === '' || obj === 'undefined')) return null;

    var query = [];

    for (let prop of Object.keys(obj)) {
        query.push(`${prop}=${obj[prop]}`)
    }

    return query.join("&");
  }
};
