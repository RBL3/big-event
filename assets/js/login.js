$(function () {
    // layui 表单验证
    var form = layui.form;
    form.verify({
        username: [/^[\S]{6,12}$/, "用户名  必须6到12位，且不能出现空格"],
        password: [/^\d{6}$/, "密码必须是6位数，且不能出现空格"],
        confirmPass: function (val) {
            if ($("#confirmPass").val() !== val) {
                return "两次输入密码不一致"
            }
        }
    })

    // 登录功能
    $("#loginForm").submit((e) => {
        e.preventDefault()
        let [username, password] = [...$(".layui-input")].map(el => el.value)
        $.ajax({
            type: "post",
            url: '/api/login',
            data: {
                username,
                password
            },
        }).then(res => {
            console.log(res);
            if (res.status === 0) {
                sessionStorage.setItem('token', res.token)
                // location.href = `./index.html?mytoken=${res.token}`
                location.href = `./index.html`
            } else {
                layui.layer.msg("登录失败用户名或密码错误", { time: 5000, icon: 5 });
            }
        })
    })

    // 注册功能
    $("#regForm").submit(function (e) {
        e.preventDefault()
        // /api/reguser
        let [username, password] = [...$("#regForm .layui-input")].map(el => el.value)
        console.log(username, password);
        // console.log([...$(".layui-input")].map(el => el.value));
        $.ajax({
            type: "post",
            url: '/api/reguser',
            data: {
                username,
                password
            }
        }).then(res => {
            // console.log(res);
            if (res.status === 0) {
                layui.layer.msg('注册成功', { time: 5000, icon: 6 });
                $(this).text("去注册账号")
                $(".tab a ").click()
                // $("loginForm").children()
                let msg = [username, password];
                [...$("#loginForm").find("input")].map((el, i) => el.value = msg[i])
            } else {
                layui.layer.msg(res.message, { time: 5000, icon: 5 });
            }
        })
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
