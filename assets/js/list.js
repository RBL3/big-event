$(function () {
    // 渲染列表函数
    var laytpl = layui.laytpl
    var laypage = layui.laypage
    var limit
    var data = []
    // 目前是假数据测试用

    // 请求渲染部分

    function render(pagenum = 1, pagesize = 3, cate_id, state) {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: {
                pagenum,
                pagesize,
                cate_id,
                state
            }
        }).then(res => {

            if (res.status === 0) {
                // console.log(res);
                data = res.data
                var getTpl = list.innerHTML
                    , view = document.querySelector(".table")

                laytpl(getTpl).render(data, function (html) {
                    view.innerHTML = html;
                });

                // console.log(res.total);   // 文章总数
                // 分页器功能完成
                laypage.render({
                    elem: 'demo7',
                    count: res.total,
                    curr: pagenum,    // 当前页码
                    limit: pagesize,  // 分页的条数
                    limits: [3, 10, 30, 40, 100],
                    layout: ['prev', 'page', 'next', 'skip', 'count', 'limit'],
                    jump: function (obj, first) {
                        // console.log(obj.count);
                        if (!first) {
                            limit = obj.limit
                            console.log(obj.curr, limit);
                            render(obj.curr, limit)
                        }
                    }
                });
            }
        })
    }

    render()
    // 筛选部分  
    layui.use("form", function () { //  此处layui方法动态渲染下拉框
        getClassify()
    })

    function getClassify() {
        $.ajax({
            type: "get",
            url: "/my/article/cates"
        }).then(res => {
            if (res.status === 0) {
                res.data.map(el => {
                    $(".articieClass").append(`<option value=${el.Id}>${el.name}</option>`)
                })
                layui.form.render("select");
            }
        })
    }

    $(".layui-form").submit((e) => {
        e.preventDefault()
        let articieClass = $(".articieClass").val()
        let articiestatus = $(".articiestatus").val()
        if (articieClass && articiestatus) {
            render(1, limit, articieClass, articiestatus)
        }
    })

    // 删除功能区域
    $(".table").on("click", ".del", function () {
        // console.log($(this).data("id"));
        $.ajax({
            type: "get",
            url: `/my/article/delete/${$(this).data("id")}`
        }).then(res => {
            if (res.status === 0) {
                layui.layer.msg("删除成功", { time: 2000, icon: 6 });
                render()
            }
        })
    })


})

