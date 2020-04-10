let textarea = document.querySelector("textarea");
let button = document.querySelector("button");
let content = document.querySelector(".hobby span");
let error = document.querySelector(".error");

//去重
function uniqArr(arr) {
    return Array.from(new Set(arr));
}

button.addEventListener("click", () => {
    let hobby = textarea.value;
    let hobbyArr = uniqArr(hobby && hobby.replace(/[\s,，、;；]+/g, ',').split(","));
    if (hobbyArr.length < 1) {
        error.innerText = "至少输入一个爱好";
    } else if (hobbyArr.length > 10) {
        error.innerText = "爱好不能超过10个";
    } else {
        let container = document.createDocumentFragment();
        hobbyArr.forEach((item, index) => {
            let div = document.createElement("div");
            div.innerHTML = `<div><input type="checkbox" id=${index+"s"} /><label for=${index+"s"}>${item}</label></div>`
            container.appendChild(div)
        });
        content.appendChild(container)
    }
});