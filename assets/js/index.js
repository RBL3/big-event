$(function () {
    $(function () {
        var loc = location.href;
        console.log(loc);
        var n2 = loc.indexOf("=") + 1
        let token = loc.substring(n2, loc.length)
        console.log(token);
        $.ajax({
            type: "get",
            url: "http://ajax.frontend.itheima.net/my/userinfo",
            headers: {
                Authorization: decodeURI(token)
            }
        }).then(res => {
            console.log(res);
            console.log(decodeURI(token) === localStorage.getItem("mytoken"));
        })
    })
})