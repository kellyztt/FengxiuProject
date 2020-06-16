const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//将wx api转成返回promise，promise是一个函数
const promisic = func => {
  return function(params = {}){
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res);
        },
        fail: (error) => {
          reject(error);
        }
      });
      func(args);
    })
  }
}

const combination = function (arr, size){
  var result = [];
  function _(t, a, n){
    if (n === 0){
      result[result.length] = t;
      return;
    }
    for (var i = 0, l = a.length  - n; i <= l; i++){
      var b = t.slice();
      b.push(a[i]);
      _(b, a.slice(i + 1), n - 1);
    }
  }
  _([], arr, size);
  return result;
}

module.exports = {
  formatTime: formatTime,
  promisic: promisic,
  combination: combination,
}
