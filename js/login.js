var account= new FieldValidator('txtLoginId',async function(val){
    if(!val){
        return '账号不能为空';
    }
    
    })
    
 
 const loginPwdValidator = new FieldValidator('txtLoginPwd', function (val) {
            if (!val) {
              return '请填写密码';
            }
          });
          
          const form = $('.user-form');
          
          form.onsubmit = async function (e) {
            e.preventDefault();
            const result = await FieldValidator.validate(
                account,
              loginPwdValidator,
            );
            if (!result) {
              return; // 验证未通过
            }
            // const formData = new FormData(form); // 传入表单dom，得到一个表单数据对象
            // const data = Object.fromEntries(formData.entries());
         
const resp=await API.login(
    {loginId:account.input.value,
     loginPwd: loginPwdValidator.input.value,
   
    }
)     
if (resp.code === 0){
       alert('登入成功，点击确定，跳转到首页');
        location.href = './index.html';
       }else{
        loginPwdValidator.p.innerText='登录失败，请检查账号或密码';
           loginPwdValidator.input.value='';
       }
          };
          