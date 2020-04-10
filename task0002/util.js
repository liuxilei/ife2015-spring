//2.JavaScript数据类型及语言基础
//2.1任务描述
//创建一个JavaScript文件，比如util.js；
//实践判断各种数据类型的方法，并在util.js中实现以下方法：


//判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
}

//判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return Object.prototype.toString.call(fn) === "[object Function]";
}


//了解值类型和引用类型的区别，了解各种对象的读取、遍历方式，并在util.js中实现以下方法：

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    let result;
    switch (Object.prototype.toString.call(src)) {
        //日期
        case "[object Date]":
            result = new Date(src);
            break;
        //数组
        case "[object Array]":
            let temp = [];
            for (let i = 0; i < src.length; i++) {
                temp[i] = cloneObject(src[i]);
            }
            result = temp;
            break;
        //Object对象
        case "[object Object]":
            let tempObj = {};
            for (let key in src) {
                tempObj[key] = cloneObject(src[key]);
            }
            result = tempObj;
            break;
        //数字、字符串、布尔
        default:
            result = src;
            break;
    }
    return result;
}

// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"



//学习数组、字符串、数字等相关方法，在util.js中实现以下函数

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    return Array.from(new Set(arr));
}
// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]

//通过把对象key不会重复实现去重
function uniqArray(arr) {
    let obj = {};
    arr.map(item => {
        obj[item] = true;
    });
    return Object.keys(obj);
}

// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]


// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    let first = 0;
    let last = str.length - 1;
    while (str[first] === " ") first++;
    while (str[last] === " ") last--;
    return str.substring(first, last + 1);
}
// 使用示例
var str = '   hi!  ';
str = simpleTrim(str);
console.log(str); // 'hi!'

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (let index in arr) {
        fn(arr[index], index);
    }
}

var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    return Object.keys(obj).length;
}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3


//学习正则表达式，在util.js完成以下代码


// 判断是否为邮箱地址
function isEmail(emailStr) {
    return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    return /^1[3456789]\d{9}$/.test(phone);
}

console.log(isEmail("liuxilei@qq.com"));
console.log(isMobilePhone("18385192857"));


//3.DOM
//3.1任务描述
//先来一些简单的，在你的util.js中完成以下任务：


// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    element.classList.add(newClassName);
}
addClass(document.body, "test");

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    element.classList.remove(oldClassName);
}
removeClass(document.body, "test");

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}
isSiblingNode(document.getElementById("number1"), document.getElementById("number2"));

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    return {
        x: element.getBoundingClientRect().left,
        y: element.getBoundingClientRect().top
    }
}
console.log(getPosition(document.getElementById("addbtn")));


//接下来挑战一个mini $，它和之前的$是不兼容的，它应该是document.querySelector的功能子集，
//在不直接使用document.querySelector的情况下，在你的util.js中完成以下任务：

// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象


// 实现一个简单的Query
function $(selector) {
    var ele = document;
    var sele = selector.replace(/\s+/, ' ').split(' ');    // 去除多余的空格并分割
    for (var i = 0, len = sele.length; i < len; i++) {
        switch (sele[i][0]) {    // 从子节点中查找
            case '#':
                ele = ele.getElementById(sele[i].substring(1));
                break;
            case '.':
                ele = ele.getElementsByClassName(sele[i].substring(1))[0];
                break;
            case '[':
                var valueLoc = sele[i].indexOf('=');
                var temp = ele.getElementsByTagName('*');
                var tLen = temp.length;
                if (valueLoc !== -1) {
                    var key = sele[i].substring(1, valueLoc);
                    var value = sele[i].substring(valueLoc + 1, sele[i].length - 1);
                    for (var j = 0; j < tLen; j++) {
                        if (temp[j][key] === value) {
                            ele = temp[j];
                            break;
                        }
                    }
                }
                else {
                    var key = sele[i].substring(1, sele[i].length - 1);
                    for (var j = 0; j < tLen; j++) {
                        if (temp[j][key]) {
                            ele = temp[j];
                            break;
                        }
                    }
                }
                break;
            default :
                ele = ele.getElementsByTagName(sele[i])[0];
                break;
        }
    }
    if (!ele) {
        ele = null;
    }
    return ele;
}

/**
 * 针对一个内容查找结果 success
 * @param  {String} selector 选择器内容
 * @param  {Element} root    根节点元素
 * @return {NodeList数组}    节点列表，可能是多个节点也可能是一个
 */
// function myQuery(selector, root) {
//     var signal = selector[0]; //
//     var allChildren = null;
//     var content = selector.substr(1);
//     var currAttr = null;
//     var result = [];
//     root = root || document; //若没有给root，赋值document
//     switch (signal) {
//         case "#":
//             result.push(document.getElementById(content));
//             break;
//         case ".":
//             allChildren = root.getElementsByTagName("*");
//             // var pattern0 = new RegExp("\\b" + content + "\\b");
//             for (i = 0; i < allChildren.length; i++) {
//                 currAttr = allChildren[i].getAttribute("class");
//                 if (currAttr !== null) {
//                     var currAttrsArr = currAttr.split(/\s+/);
//                     console.log(currAttr);
//                     for (j = 0; j < currAttrsArr.length; j++) {
//                         if (content === currAttrsArr[j]) {
//                             result.push(allChildren[i]);
//                             console.log(result);
//                         }
//                     }
//                 }
//             }
//             break;
//         case "[": //属性选择
//             if (content.search("=") == -1) { //只有属性，没有值
//                 allChildren = root.getElementsByTagName("*");
//                 for (i = 0; i < allChildren.length; i++) {
//                     if (allChildren[i].getAttribute(selector.slice(1, -1)) !== null) {
//                         result.push(allChildren[i]);
//                     }
//                 }
//             } else { //既有属性，又有值
//                 allChildren = root.getElementsByTagName("*");
//                 var pattern = /\[(\w+)\s*\=\s*(\w+)\]/; //为了分离等号前后的内容
//                 var cut = selector.match(pattern); //分离后的结果，为数组
//                 var key = cut[1]; //键
//                 var value = cut[2]; //值
//                 for (i = 0; i < allChildren.length; i++) {
//                     if (allChildren[i].getAttribute(key) == value) {
//                         result.push(allChildren[i]);
//                     }
//                 }
//             }
//             break;
//         default: //tag
//             result = root.getElementsByTagName(selector);
//             break;
//     }
//     return result;
// }

//4.事件
//任务描述
//我们来继续用封装自己的小jQuery库来实现我们对于JavaScript事件的学习，还是在你的util.js，实现以下函数
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    element.addEventListener(event, listerner);
}

//addEvent($("#doma"), "click", a);

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    element.removeEventListener(event, listerner);
}

//接下来我们实现一些方便的事件方法

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    element.addEventListener("click", listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    element.addEventListener("keydown", function(e) {
        if (e.keyCode == 13) {
            listener();
        }
    });
}

//接下来考虑这样一个场景，我们需要对一个列表里所有的<li>增加点击事件的监听

// 先简单一些
function delegateEvent(element, tag, eventName, listener) {
    element.addEventListener(eventName, function(e) {
        if (e.target.nodeName === tag.toUpperCase()) {
            e.target.addEventListener(eventName, listener);
        }
    })
}
var $ = {};

$.delegate = delegateEvent;

// 使用示例
// 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
$.delegate(document.getElementById("list"), "li", "click", function() {
    console.log(1);
});

//5.BOM
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    return /msie (\d+\.\d+)/i.test(navigator.userAgent)
        ? (document.documentMode || + RegExp['\x241']) : -1;
}

function isValidCookieName(cookieName) {
    // http://www.w3.org/Protocols/rfc2109/rfc2109
    // Syntax:  General
    // The two state management headers, Set-Cookie and Cookie, have common
    // syntactic properties involving attribute-value pairs.  The following
    // grammar uses the notation, and tokens DIGIT (decimal digits) and
    // token (informally, a sequence of non-special, non-white space
    // characters) from the HTTP/1.1 specification [RFC 2068] to describe
    // their syntax.
    // av-pairs   = av-pair *(";" av-pair)
    // av-pair    = attr ["=" value] ; optional value
    // attr       = token
    // value      = word
    // word       = token | quoted-string

    // http://www.ietf.org/rfc/rfc2068.txt
    // token      = 1*<any CHAR except CTLs or tspecials>
    // CHAR       = <any US-ASCII character (octets 0 - 127)>
    // CTL        = <any US-ASCII control character
    //              (octets 0 - 31) and DEL (127)>
    // tspecials  = "(" | ")" | "<" | ">" | "@"
    //              | "," | ";" | ":" | "\" | <">
    //              | "/" | "[" | "]" | "?" | "="
    //              | "{" | "}" | SP | HT
    // SP         = <US-ASCII SP, space (32)>
    // HT         = <US-ASCII HT, horizontal-tab (9)>

    return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24'))
        .test(cookieName);
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    if (!isValidCookieName(cookieName)) {
        return;
    }

    var exdate = '';
    if (expiredays) {
        exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        var expires = ';expires=' + exdate.toUTCString();     // toGMTString is deprecated and should no longer be used, it's only there for backwards compatibility, use toUTCString() instead
    }
    document.cookie = cookieName + '=' + encodeURIComponent(cookieValue) + expires;    // 废弃的 escape() 方法生成新的由十六进制转移序列替换的字符串. 使用 encodeURI 或 encodeURIComponent 代替
}

// 获取cookie值
function getCookie(cookieName) {
    if (!isValidCookieName(cookieName)) {
        return null;
    }

    var re = new RegExp(cookieName + '=(.*?)($|;)');
    return re.exec(document.cookie)[1] || null;
}

// task 6.1
// 学习Ajax，并尝试自己封装一个Ajax方法。
function ajax(url, options) {
    // 创建对象
    let request = new requestRequest();
    let data;
    // 处理data
    if (options.data) {
        let dataArr = [];
        for (let item in options.data) {
            dataArr.push(item + '=' + encodeURI(options.data[item]));
        }
        data = dataArr.join('&');
    }

    // 处理type
    if (!options.type) {
        options.type = 'GET';
    }
    options.type = options.type.toUpperCase();

    // 发送请求
    if (options.type === 'GET') {
        var myURL = '';
        if (options.data) {
            myURL = url + '?' + data;
        }
        else {
            myURL = url;
        }
        request.open('GET', myURL, true);
        request.send();
    } else if (options.type === 'POST') {
        request.open('POST', url, true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(data);
    }

    // readyState
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                if (options.onsuccess) {
                    options.onsuccess(request.responseText, request.responseXML);
                }
            }
            else {
                if (options.onfail) {
                    options.onfail();
                }
            }
        }
    }
}