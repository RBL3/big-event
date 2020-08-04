$(function () {

    var laytpl = layui.laytpl;
    // 定义数据
    var data

    // ajax请求接口
    let token = sessionStorage.getItem("token")
    function render() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            headers: {
                Authorization: token
            }
        }).then(res => {
            if (res.status === 0) {
                data = res.data
                console.log(data);
                // 获取渲染标签
                var getTpl = tbody.innerHTML

                    // 获取根节点
                    , view = document.querySelector(".form")
                // 渲染
                laytpl(getTpl).render(data, function (html) {
                    view.innerHTML = html;
                });
            }
        })
    }
    render()

    // 添加文章 /my/article/addcates  name  alias
    $("#addBtn").on("click", function () {
        layer.open({
            title: "添加分类",
            type: 1,
            area: ['470px', '240px'], //宽高
            content: addFrom.innerHTML
        });
        // console.log($("articleClass"));
        $("#articleClass").submit(function (e) {
            e.preventDefault()
            $.ajax({
                type: "post",
                url: "/my/article/addcates",
                data: $(this).serialize(),
                headers: {
                    Authorization: token
                }
            }).then(res => {
                // console.log(res);
                if (res.status === 0) {
                    layer.closeAll();
                    render()
                } else {
                    layui.layer.msg("添加失败", { time: 5000, icon: 5 });
                }
            })
        })
    })


    // 删除分类部分  del
    $(".form").on("click", function (e) {
        let id = $(e.target).data("id")
        $.ajax({
            type: "get",
            url: `/my/article/deletecate/${id}`,
            headers: {
                Authorization: token
            }
        }).then(res => {
            if (res.status === 0) {
                render()
                layui.layer.msg("删除成功", { time: 2000, icon: 6 });
            } else {
                render()
            }
        })
    })



































})