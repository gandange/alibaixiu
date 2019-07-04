// 退出功能的实现
$(function(){
    // 找到退出的按钮绑定事件
    $("#loginout").on("click",function(){
        // 判断用户是否真的要退出
        const isClose = confirm("您确定要退出吗？");
        // 判断选择 是要退出还是取消
        if(isClose){
            // 如果用户选择的是要退出就调用接口来清楚登录状态
            $.ajax({
                type: "post",
                url: "/logout",
                success: function (response) {
                    // 退出成功 跳转到 登录页
                    location.href = "login.html"
                },
                error : function(){
                    //退出失败
                   alert("退出失败，请重新操作！")
                    
                }
            });
        }
        // 去掉A标签的默认跳转事件
         return false;
    })
})