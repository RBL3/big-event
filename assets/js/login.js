$(function () {
    // layui 表单验证
    var form = layui.form;
    form.verify({
        username: [/^[\S]{6,12}$/, "用户名  必须6到12位，且不能出现空格"],
        password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"]
    })

    // 登录功能
    $("#loginForm").submit((e) => {
        e.preventDefault()
        let [username, password] = [...$(".layui-input")].map(el => el.value)
        console.log(username, password);
        $.ajax({
            type: "post",
            url: 'http://ajax.frontend.itheima.net/api/login',
            data: {
                username,
                password
            },
        })
            .then(res => {
                console.log(res);
                if (res.status === 0) {
                    localStorage.setItem('mytoken', res.token)
                    location.href = `./index.html?mytoken=${res.token}`
                } else {
                    layui.layer.msg('登录失败用户名或密码错误');
                }
            })
    })

    // 注册功能
    $("#regForm").submit(function (e) {
        e.preventDefault()

    })


    // 切换登录注册表单
    let tablogin = false
    $(".tab a ").click(function () {

        if (tablogin) {
            $(this).text("去注册账号")
            $("#loginForm").css("display", "block")
            $("#regForm").css("display", "none")
        } else {
            $(this).text("去登录")
            $("#loginForm").css("display", "none")
            $("#regForm").css("display", "block")
        }
        tablogin = !tablogin
    })

})
