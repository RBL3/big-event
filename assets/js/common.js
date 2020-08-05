$(function () {
    var baseURL = "http://ajax.frontend.itheima.net"
    $.ajaxPrefilter(function (option) {
        option.beforeSend = function () {
            window.NProgress && window.NProgress.start()
        }
        option.url = baseURL + option.url
        if (option.url.lastIndexOf('/my/') !== -1) {

            option.headers = {
                Authorization: sessionStorage.getItem('token')
            }
        }
        window.NProgress && window.NProgress.done()

        option.complete = function (res) {
            window.NProgress && window.NProgress.done()
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 把无效的token清除
                sessionStorage.removeItem('mytoken')
                // 如果身份验证失败了，就跳转到登录页面
                location.href = './login.html'
            }
        }
    })
})