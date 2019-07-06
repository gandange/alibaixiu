// 分类目录功能区 ---------------
$("#add_Classification").on("submit",function(){
    // 获取表单内的值
    const fromeData = $(this).serialize();
    // 发送请求增加分类项
    $.ajax({
        type: "post",
        url: "/categories",
        data: fromeData,
        success: function (response) {
            // 这里会返回成功提交的那条信息
            $("#fromereset").trigger("click");
            // 重新渲染右侧列表
            initializationList();
        },
        error : function(err){
            console.log(err);
            alert("添加出错，请查看控制台输出的错误信息！")
        }
    });
    // 清除自己的默认提交事件
    return false;
})

// 分类目录初始化请求 -----------------
initializationList();
function initializationList() { 
    // 发起AJAX请求到数据库中的分类信息
    $.ajax({
        type: "get",
        url: "/categories",
        success: function (response) {
          // 成功按到数据 渲染模板
          const html = template('templat_list_titile',{
              data : response
          });
        // 把模板给到 需要渲染的位置
        $("#title_info").html(html);
        },
        error : function(err){
            console(err);
            alert("获取分类列表失败");
        }
    });
 }
 // 编辑功能 ---------
 $("#title_info").on("click",".edit",function(){
     //点击编辑功能 ----
     // 获取需要编辑的那个按钮
     const edit_id = $(this).parent().attr("data-id");
     //发起编辑的AJAX请求
     $.ajax({
         type: "get",
         url: "/categories/" + edit_id ,
         success: function (response) {
              // 把修改模板进行渲染
              const editTemlpat = template("edit",response);
              // 吧HTML渲染到指定的位置
              $("#edit_from").html(editTemlpat);
         },
         error : function(err){
              console.info(err);
              alert("编辑失败，请重新操作")
         }
     });
     
     return false
 })
 // 编辑提交修改功能 -------------
 $("#edit_from").on("submit","#eait_temlplat",function(){
     // 获取需要提交的修改的ID
     const edit_id = $(this).attr("data-id");
     //需要拿到修改之后的内容传递给服务器
     const info_edit = $(this).serialize();
     // 发起修改的AJAX 请求
     $.ajax({
         type: "put",
         url: "/categories/" + edit_id,
         data: info_edit,
         success: function (response) {
            // 发送成功之后重新渲染数据列表
            // initializationList();
            // 这个重新刷新 很LOW 需要调整
            location.reload();
         },
         error : function(err){
             console.log(err)
             alert("编辑失败")
         }
     });
     
     
     return false;
 })