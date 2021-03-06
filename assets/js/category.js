$(function () {

    var laytpl = layui.laytpl;
    var form = layui.form
    console.log(form);
    // 定义数据
    var data
    // ajax请求接口
    function render() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
        }).then(res => {
            if (res.status === 0) {
                data = res.data
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

    // 添加文章分类 /my/article/addcates  name  alias
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
            }).then(res => {
                // console.log(res);
                if (res.status === 0) {
                    layer.closeAll("page");
                    layui.layer.msg("添加成功", { time: 2000, icon: 6 });
                    render()
                } else {
                    layui.layer.msg("添加失败", { time: 2000, icon: 5 });
                }
            })
        })
    })


    // 事件委托的形式注册 删除或者编辑时间
    $(".form").on("click", function (e) {
        let id = $(e.target).data("id")
        if ($(e.target).text().includes("删除")) {
            // 删除分类部分  del
            $.ajax({
                type: "get",
                url: `/my/article/deletecate/${id}`,
            }).then(res => {
                if (res.status === 0) {
                    render()
                    layui.layer.msg("删除成功", { time: 2000, icon: 6 });
                } else {
                    render()
                }
            })
        } else if ($(e.target).text().includes("编辑")) {
            // 修改文章分类
            $.ajax({
                type: "get",
                url: `/my/article/cates/${id}`,
            }).then(res => {
                if (res.status === 0) {
                    // console.log(res);
                    let data = res.data
                    // 获取渲染的标签
                    layer.open({
                        title: "修改分类",
                        type: 1,
                        area: ['470px', '240px'], //宽高
                        content: changeForm.innerHTML,
                        // 弹出层弹出之后执行的函数
                        success(layero) {   // 参数layero是弹出层
                            console.log(form.val);
                            form.val("editForm", res.data)
                            // $(layero).find(".change")[0].value = data.name
                            // $(layero).find(".change")[1].value = data.alias
                            // 弹出层表单提交
                            $("#changeArtClass").submit(function (e) {
                                e.preventDefault()
                                // ajax请求 修改数据
                                $.ajax({
                                    type: "post",
                                    url: "/my/article/updatecate",
                                    data: {
                                        Id: id,
                                        name: $(layero).find(".change")[0].value,
                                        alias: $(layero).find(".change")[1].value,
                                        // ...($(this).serialize())
                                    }
                                }).then(res => {
                                    if (res.status === 0) {
                                        layui.layer.msg("更新成功", { time: 2000, icon: 6 });
                                        layer.closeAll("page");
                                        render()
                                    }
                                })
                            })
                        }
                    });
                }
            })
        }

    })




































})