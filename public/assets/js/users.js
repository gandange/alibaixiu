
$(function(){
    // 添加用户功能 ---------------
    $("#newUser").on("submit",function(){
        // 将表单内带name属性的值统一收集
        // serialize 可以转换成fromedata
        const newUser = $(this).serialize();
        $.ajax({
            type : "post",
            url : '/users',
            data : newUser,
            success : function(res){
                // 用户添加成功 刷新一遍
                startlist();
                // 清空自身输入数据 出发一下隐藏域清空事件
                $("#reset_frome").trigger("click");
                // 清空图片预览
                $("#view_img").attr("src","../assets/img/default.png");

            },
            error : function(){
                alert("用户添加失败")
            }
        })
        // 阻止默认提交事件
        return false;
    })
    // 头像上传功能 -----------------
    $("#modify_section").on('change',"#avatar",function(){
        // 获取选择文件的路径
        const fileSrc = this.files[0];
         // 将他转换成可上传的二进制文件
        let formData = new FormData();
        formData.append('avatar',fileSrc);
        // 发送请求获取预览路径
        $.ajax({
            type: 'post',
            url : '/upload',
            data : formData,
            // 因为是二进制文件不需要AJAX解析设置
            processData : false,
            // 也不需要设置参数的类型
            contentType : false,
            success : function(res){
                // 请求成功将返回一个 图片的路径
                // 给到预览图片标签
                $("#view_img").attr('src',res[0].avatar);
                // 然后把这个路径给到 隐藏域的值便于总体传入到数据库中
                $("#hiddenScr").val(res[0].avatar);
            },
            error : function(){
                // 上传失败
                alert("图片上传失败，请重新操作！")
            }
        })
    })
    // 用户列表展示功能 ------------------
    function startlist(){
        $.ajax({
            type : 'get',
            url : '/users',
            success : function(res){
                const html = template('templat_list_user',{
                    data : res
                });
                $("#list_data").html(html);
            },
            error : function(){
                alert("用户列表获取失败！");
            }
        })
    }
    startlist();
   // 用户列表编辑功能 ---------------------
   $("#list_data").on("click",".eait",function(){
       // 给所有的编辑按钮绑定点击事件
       const thisId = $(this).attr("data-id");
       // 发起ajax 请求
       $.ajax({
           type : 'put',
           url : '/users/' + thisId,
           success : function(res){
                // 拿到查询的那条数据 渲染在新的模板当中
                let html = template('templat_modify',res);
                //渲染到制定位置
                $("#modify_section").html(html);
                
           },
           error : function(){
               alert("编辑失败，请重新操作！");
           }
       })
   })

// 编辑修改提交
$("#modify_section").on("submit","#modify_user",function(){
    // 提交修改 更换服务器内容信息
    // 获取到当前被修改的 的id
    const id = $(this).attr("data-id");
    // 获取修改的之后的值
    const thisFromData = $(this).serialize();
     // 发起修改的请求
     $.ajax({
         type : 'put',
         url : '/users/' + id,
         data : thisFromData,
         success : function(res){
             // 重新刷新页面
             location.reload();
         },
         error : function(){
             alert("修改内容失败，请重试");
         }
     })
    // 清除默认提交事件
    return false;
})
 // 删除单个用户的功能 ----------------------
 $("#list_data").on("click",".delect_user",function(){
     //需要拿到自己要删除的这条数据
     const thisId = $(this).siblings('.eait').attr("data-id");
     // 需要确认管理员是否要删除用户
     const isDele = confirm("您确定要删除该用户吗？");
     if(!isDele){
        // 不删除什么也不做
        alert("删除操作已成功取消！")
        return
     }
     $.ajax({
        type : 'delete',
        url : '/users/' + thisId,
        success :function(res){
            // 返回你要删除掉额那条数据
            startlist();
        },
        error : function(err){
             alert(err['message'])
        }
    })
     // 根据拿到的数据去删除
     
     
 })
})