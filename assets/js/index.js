$(function () {
    $(function () {
        // var loc = location.href;
        // console.log(loc);
        // var n2 = loc.indexOf("=") + 1
        // let token = loc.substring(n2, loc.length)
        // console.log(token);
        let token = sessionStorage.getItem("token")
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            headers: {
                Authorization: token
            }
        }).then(res => {
            if (res.status === 0) {
                // console.log(res);
                $(".userName span").text(res.data.username)
                if (res.data.user_pic) {
                    $(".layui-nav-img").prop("src", res.data.user_pic)
                } else {
                    $(".layui-nav-img").prop("src", "./assets/images/photo.JPG")
                }

            } else {
                location.href = `./login.html`
            }

        })
    })

    // 内容主体区引入html

    $(".option").click(function () {
        $("iframe").prop("src", $(this).data("page"))
    })














})