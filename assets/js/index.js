$(function () {
    // console.log(token);
    function loadUserInfo() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
        }).then(res => {
            if (res.status === 0) {
                // console.log(res);
                $(".userName span").text(res.data.username)
                if (res.data.user_pic) {
                    $(".layui-nav-img").prop("src", res.data.user_pic)
                } else {
                    $(".layui-nav-img").prop("src", "./assets/images/photo.JPG")
                }

            }

        })
    }
    loadUserInfo()

    // 内容主体区引入html
    $(".option").click(function () {
        $("iframe").prop("src", $(this).data("page"))
    })

    // 退出功能
    $(".exit").click(function () {
        layer.confirm('确认退出', { icon: 3, title: '提示' }, function (index) {
            layer.close(index);
            sessionStorage.removeItem("token")
            location.href = './login.html'
        });
    })

})




