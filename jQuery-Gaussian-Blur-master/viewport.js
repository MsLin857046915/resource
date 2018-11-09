(function () {
    var designWidth = 414;  //设计稿宽度
    var maxWidth = 1500; //最大宽度
    var doc = document,
        win = window,
        docEl = doc.documentElement,
        remStyle = document.createElement("style"),
        tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        maxWidth = maxWidth || 540;
        width > maxWidth && (width = maxWidth);
        var rem = width * 100 / designWidth;
        remStyle.innerHTML = 'html{font-size:' + rem + 'px !important;}';
    }

    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(remStyle);
    } else {
        var wrap = doc.createElement("div");
        wrap.appendChild(remStyle);
        doc.write(wrap.innerHTML);
        wrap = null;
    }
    refreshRem();

    win.addEventListener("resize", function () {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);

    win.addEventListener("pageshow", function (e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === "complete") {
        doc.body.style.fontSize = "16px";
    } else {
        doc.addEventListener("DOMContentLoaded", function (e) {
            doc.body.style.fontSize = "16px";
        }, false);
    }
})(750, 750);


//判断页面协议
var protocol = window.location.protocol;
var appUrl = '//localhost:23132';
if (protocol == 'https:') {
    appUrl = '//myapp.ksearch.cn:23132';
}

/*配置文件选择加载cdn上的js还是域名下的js*/
if (location.hostname == "t.mayixiaoka.com" || location.hostname == "t3.mayixiaoka.com") {
    var config = "//"+location.hostname.split(".")[0]+"cdn.mayixiaoka.com/v3js/";
} else {
    var config = "//cdn.mayixiaoka.com/v3js/";
}