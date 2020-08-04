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
                view = document.querySelector(".form")
                // 渲染
                laytpl(getTpl).render(data, function (html) {
                    view.innerHTML = html;
                });
            }
        })
    }
    render()

    // 删除分类部分  del
    $(".form").on("click", function (e) {
        console.log($(e.target).data("id"));
        let id = $(e.target).data("id")
        $.ajax({
            type: "get",
            url: `/my/article/deletecate/:${id}`,
        })
    })



































})