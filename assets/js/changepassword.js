$(function () {
    var form = layui.form;
    form.verify({
        password: [/^\d{6}$/, "密码必须是6位数，且不能出现空格"],
        confirmPass: function (val) {
            if ($("#confirmPass").val() !== val) {
                return "两次输入密码不一致!"
            }
        },
        samePass: function (val) {
            if ($("#samePass").val() === val) {
                return "新密码不能同原密码相同!"
            }
        }
    })

    $(".layui-form").submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: $(this).serialize()
        }).then(res => {
            if (res.status === 0) {
                layui.layer.msg("密码设置成功", { time: 2000, icon: 6 });
            } else if (res.status === 1 && res.message === "原密码错误！") {
                layui.layer.msg("原密码输入错误", { time: 2000, icon: 5 });
            }
        })
    })
})