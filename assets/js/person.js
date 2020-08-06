$(function () {
    let form = layui.form
    function loadUserinfo() {
        $.ajax({
            type: "get",
            url: "/my/userinfo"
        }).then(res => {
            if (res.status === 0) {
                // console.log(res);
                // 基于layui实现表单填充 form标签设置 lay-filter = "xxx" 属性 js属性调用layui.form.val(data) 方法 依据表单的name填充
                form.val('basicForm', res.data)
                $(".layui-form input[name=username]").data("id", res.data.id)
            } else {
                layui.layer.msg("获取信息失败", { time: 2000, icon: 5 });
            }
        })
    }
    loadUserinfo()
    $(".layui-form").submit(function (e) {
        e.preventDefault()
        // serializeArray() jq方法 form表单请求返回一个数组   data可以直接填入数组
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: {
                id: $(".layui-form input[name=username]").data("id"),
                nickname: $(".layui-form input[name=nickname]").val(),
                email: $(".layui-form input[name=email]").val()
            }
        }).then(res => {
            if (res.status === 0) {
                console.log(res);
                layui.layer.msg("更新用户信息成功", { time: 2000, icon: 6 });
                loadUserinfo()
            }
        })
    })
    // 重置按钮
    $("#resetForm").click(() => loadUserinfo())
})
