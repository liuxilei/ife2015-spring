//判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    if (arr instanceof Array) {
        return true;
    } else {
        return false;
    }
}

//判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    if (typeof fn === 'function') {
        return true;
    } else {
        return false;
    }
}

//测试
console.log(isArray(1)); //false
console.log(isArray([])); //true
console.log(isArray({})); //false
console.log(isFunction(1)); //false
console.log(isFunction([])); //false
console.log(isFunction({})); //false
console.log(isFunction(RegExp)); //true