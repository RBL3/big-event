$(function () {
    // 渲染列表函数
    var laytpl = layui.laytpl
    var laypage = layui.laypage
    var form = layui.form
    var limit
    var data = []
    // 目前是假数据测试用

    // 请求渲染部分

    // 给laytpl添加函数 格式化时间
    laytpl.timeFormat = function (time) {
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();
        let second = date.getSeconds();
        return year + "-" + laytpl.setZero(month) + "-" + laytpl.setZero(day) + " " + laytpl.setZero(hour) + ":" + laytpl.setZero(min) + ":" + laytpl.setZero(second);
    };
    // 给laytpl添加函数 格式化时间
    laytpl.setZero = function (data) {
        return data < 10 ? "0" + data : data
    }


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
                // data.map(el => {
                //     el[fn] = function () {
                //         return 2222
                //     }
                // })
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
    // 渲染下拉分类列表
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
    // 筛选功能
    $(".layui-form").submit((e) => {
        e.preventDefault()
        let articieClass = $(".articieClass").val()
        let articiestatus = $(".articiestatus").val()

        render(1, limit, articieClass, articiestatus)
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

    // 编辑功能
    $(".table").on("click", ".edit", function (e) {
        // console.log($(e.target).data("id"));
        let id = $(e.target).data("id")
        $.ajax({
            type: "get",
            url: "/my/article/" + id
        }).then(res => {
            console.log(res);
            // 弹出层
            layer.open({
                title: "添加分类",
                type: 1,
                offset: ['10%', '20%'],
                area: ['auto', 'auto'], //宽高
                content: editFrom.innerHTML,
                success(layero) {        // 弹出层弹出之后执行

                    // 获取文章分类  并且渲染到 select标签
                    $.ajax({
                        type: "get",
                        url: "/my/article/cates"
                    }).then(res => {
                        res.data.map(el => {
                            $(layero).find("#artClass").append(`<option value=${el.Id}>${el.name}</option>`)
                        })
                    })

                    initEditor()  // 初始化富文本
                    // 填充标题
                    form.val("basicForm", res.data)  // 将内容填充到表单
                    var html = $(layero).find("textarea").val()
                    // 格式化富文本中的html标签  后台返回的是字符串形式的html标签
                    $(layero).find("textarea").val($(html).text())
                    // 将获取的封面渲染到 裁切区域
                    $(layero).find("#image").attr('src', "http://ajax.frontend.itheima.net" + res.data.cover_img)
                    // 根据文章类别的id发送ajax请求  设置select标签的默认选项
                    $.ajax({
                        type: "get",
                        url: "/my/article/cates/" + res.data.cate_id
                    }).then(res => {
                        [...$("#artClass").find("option")].map(el => {
                            if ($(el).html().includes(res.data.name)) {
                                console.log(el);
                                $(el).attr("selected", "selected")
                            }
                            form.render("select")
                        })
                    })

                    // 图片裁切区域 
                    var $image = $(layero).find("#image")
                    const options = {
                        // 纵横比
                        aspectRatio: 400 / 280,
                        // 指定预览区域
                        preview: '.img-preview',
                        // crop(event) {
                        //     console.log(event);
                        // }
                    }
                    $image.cropper(options)

                    // 点击选择封面
                    $("#select-btn").click(function () {
                        $("#cover_img").click()
                    })
                    // 文件上传事件
                    $("#cover_img").change(function () {
                        // console.log($(this)[0].files[0]);
                        // URL.createObjectURL(file) 基于选中的文件生成一个预览的地址
                        var newImgURL = URL.createObjectURL($(this)[0].files[0])
                        $image
                            .cropper('destroy')      // 销毁旧的裁剪区域
                            .attr('src', newImgURL)  // 重新设置图片路径
                            .cropper(options)        // 重新初始化裁剪区域
                    })
                    // 点击设置状态
                    var state
                    $(layero).on("click", ".issue", function () {
                        state = "已发布"
                    })
                    $(layero).on("click", ".draft", function () {
                        state = "草稿"
                    })


                    // 表单提交事件
                    $(".layui-form").submit(function (e) {
                        e.preventDefault()
                        $image.cropper("getCroppedCanvas", {
                            width: 100,
                            height: 100
                        }).toBlob(dataURL => {    // 将图片转成	blob二进制  参数就是图片(是个对象)
                            let formData = new FormData($(this)[0])
                            // console.log(dataURL);
                            formData.append("Id", id)
                            formData.append("cover_img", dataURL)
                            formData.append("state", state)
                            $.ajax({
                                type: "post",
                                url: "/my/article/edit",
                                data: formData,
                                // 防止把请求参数转换为字符串
                                processData: false,
                                // 禁止使用默认的提交参数类型
                                contentType: false,
                            }).then(res => {
                                console.log(res);
                                if (res.status === 0) {
                                    layer.closeAll("page");
                                    render()
                                    layui.layer.msg("发布成功", { time: 2000, icon: 6 });
                                }
                            })
                        })

                    })




                }
            });
        })




    })


})

