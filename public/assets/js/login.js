
// 管理页面登录功能
$(function(){
    //  ------- 第一步 ： 获取需要验证的值 ----
    const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    //  ------- 第二步 ： 给按钮绑定事件 ----
    $("#subBtn").on("click",function(){
        // 非空校验 邮箱格式校验
        // 获取用户名和密码
        const userEmail = $("#email").val();
        const userPwd = $("#password").val();
        // 判断数据 是否有效
        if(userEmail.trim().length == 0){
            alert("请输入用户名！");
            return;
        }else if(userPwd.trim().length == 0){
            alert("请输入密码");
            return;
        }else{
            // 如果都输入了就判断用户输入的是否用户名是否合法
            const userEmainreg = emailReg.test(userEmail);
            if(!userEmainreg){
                alert("您输入的用户名不合法！");
                return;
            }
        }
       // 发送请求 判断该用户是否已存在 存在就跳转 不存在提示用户注册或者联系管理员
       $.ajax({
           type: "post",
           url: "/login",
           data: {
               email : userEmail,
               password : userPwd
           },
           success: function (response) {
            // 登录成功就跳转到管理页面
            location.href = 'index.html'
               
           },
           error : function(err){               
               alert("用户名或者密码错误！")
           }
       });
        
    })

})