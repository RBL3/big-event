$(function () {
    var baseURL = "http://ajax.frontend.itheima.net"
    $.ajaxPrefilter(function (option) {
        // option 是请求配置选项 $.ajax的参数
        option.url = baseURL + option.url
    })
})