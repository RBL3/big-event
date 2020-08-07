$(function () {
    // // 富文本区域
    // var form = layui.form
    // var layedit = layui.layedit;
    // var options = {
    //     tool: [
    //         'html', 'code', 'strong', 'underline', 'del', 'addhr', '|', 'fontFomatt', 'colorpicker', 'face'
    //         , '|', 'left', 'center', 'right', '|', 'link', 'unlink', 'images', 'image_alt',
    //         , '|', 'fullScreen'
    //     ],

    // }
    // // layedit.set(options)
    // var index = layedit.build("demo")
    // layedit.sync(index)    // 用于同步编辑器内容到textarea
    // layedit.getSelection(index)   // 获取编辑器选中的文本

    initEditor()
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

    // 封面切图区域
    var $image = $('#image')
    const options = {
        // 纵横比
        aspectRatio: 1,
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

    // 文件上传标签发生改变触发的事件
    $("#cover_img").change(function () {
        // console.log($(this)[0].files[0]);
        // URL.createObjectURL(file) 基于选中的文件生成一个预览的地址
        var newImgURL = URL.createObjectURL($(this)[0].files[0])
        console.log(newImgURL);

        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })



    // 此处加上需要判断点击的按钮  是发布还是保存到草稿
    $(".layui-form").submit(function (e) {
        e.preventDefault()
        $image.cropper("getCroppedCanvas", {
            width: 100,
            height: 100
        }).toBlob(dataURL => {    // 将图片转成	blob二进制  参数就是图片(是个对象)
            // dataURL = a
            let formData = new FormData($(this)[0])
            formData.append("cover_img", dataURL)
            formData.append("state", "已发布")
            // console.log($("#title").val(), $("#artClass").val(), $("textarea[name=content]").val());
            // console.log(dataURL);
            $.ajax({
                type: "post",
                url: "/my/article/add",
                data: formData,
                // 防止把请求参数转换为字符串
                processData: false,
                // 禁止使用默认的提交参数类型
                contentType: false,
            }).then(res => {
                console.log(res);
                if (res.status === 0) {
                    $("button[type=reset]").click()
                    $image
                        .cropper('destroy')
                        .attr('src', "../../assets/images/sample2.jpg")
                        .cropper(options)
                    layui.layer.msg("发布成功", { time: 2000, icon: 6 });
                }
            })
        })



    })






















})