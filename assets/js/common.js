$(function () {
    var baseURL = "http://ajax.frontend.itheima.net"
    $.ajaxPrefilter(function (option) {
        option.beforeSend = function () {
            window.NProgress && window.NProgress.start()
        }
        option.url = baseURL + option.url
        if (option.url.includes('/my/')) {

            option.headers = {
                Authorization: sessionStorage.getItem('token')
            }
        }
        window.NProgress && window.NProgress.done()

        option.complete = function (res) {
            window.NProgress && window.NProgress.done()
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                sessionStorage.removeItem('token')
                location.href = './login.html'
            }
        }
    })
})