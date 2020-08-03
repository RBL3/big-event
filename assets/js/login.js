$(function () {
    // 设置请求头
    // /api/login

    $("#loginForm").submit((e) => {
        e.preventDefault()
        if ([...$(".layui-input")].every(el => !el.value)) {
            layui.layer.msg('用户名或密码为空');
            return
        }
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
                }
            })

    })
})
