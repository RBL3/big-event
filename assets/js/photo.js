$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview',
        // crop(event) {
        //     console.log(event);
        // }
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)




    // 点击按钮选择图片
    $("#addFile").click(function () {
        $("#file").click()
    })

    // 监听选择图片的事件
    $("#file").change(function () {
        // console.log($(this)[0].files[0]);
        // URL.createObjectURL(file) 基于选中的文件生成一个预览的地址
        var newImgURL = URL.createObjectURL($(this)[0].files[0])
        console.log(newImgURL);

        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    $("#affirm").click(function () {
        var dataURL = $image.cropper("getCroppedCanvas", {
            width: 100,
            height: 100
        }).toDataURL('image/png')
        $.ajax({
            type: "post",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            }
        }).then(res => {
            if (res.status === 0) {
                parent.$.loadUserInfo()
                layui.layer.msg("更新头像成功", { time: 2000, icon: 6 });
            }
        })
    })
    // 子页面调用父页面中的函数 parent.window.loadUserInfo

})

 // Cropper 使用笔记

 // new Cropper(element[, options])  
 // 第一个参数是个dom节点必须是img标签或则canvas标签
 // 第二个参数是配置

 // 关于options
 // 如果想要更改全局默认选项 可以调用 Cropper.setDefaults(options)
 // import 'cropperjs/dist/cropper.css';

 // 例子
 // import Cropper from 'cropperjs';  引入

 // const image = document.getElementById('image');
 // const cropper = new Cropper(image, {
 //   aspectRatio: 16 / 9,   // 裁切尺寸配置
 //   crop(event) {          // 触发的事件(只要有变化都会触发)
 //     console.log(event.detail.x);
 //     console.log(event.detail.y);
 //     console.log(event.detail.width);
 //     console.log(event.detail.height);
 //     console.log(event.detail.rotate);
 //     console.log(event.detail.scaleX);
 //     console.log(event.detail.scaleY);
 //   },
 // });

 // Cropper 区域的大小继承于 img 可见父元素的大小  所以img标签应该放在一个可见块元素内

 // 输出图像大小基于原始图片大小 所以可以直接裁切图像