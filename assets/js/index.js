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
                console.log(res);
            } else {
                location.href = `./login.html`
            }

        })
    })
})