var account= new FieldValidator('txtLoginId',async function(val){
    if(!val){
        return '账号不能为空';
    }
    //调用之前写好的api 检查账号是否存在
    const resp=await API.checking(val);
    if(resp.data){
        return '该账号已被注册，请重新输入';
    }
    })
    
var names=new FieldValidator('txtNickname',function(val){
        if(!val){
            return '昵称不能为空';
        }
        })
 const loginPwdValidator = new FieldValidator('txtLoginPwd', function (val) {
            if (!val) {
              return '请填写密码';
            }
          });
          
 const loginPwdConfirmValidator = new FieldValidator(
            'txtLoginPwdConfirm',
            function (val) {
              if (!val) {
                return '请填写确认密码';
              }
              if (val !== loginPwdValidator.input.value) {
                return '两次密码不一致';
              }
            }
          );
          
          const form = $('.user-form');
          
          form.onsubmit = async function (e) {
            e.preventDefault();
            const result = await FieldValidator.validate(
                account,
                names,
              loginPwdValidator,
              loginPwdConfirmValidator
            );
            if (!result) {
              return; // 验证未通过
            }
            // const formData = new FormData(form); // 传入表单dom，得到一个表单数据对象
            // const data = Object.fromEntries(formData.entries());
         
const resp=await API.reg(
    {loginId:account.input.value,
     loginPwd:loginPwdValidator.input.value,
     nickname: names.input.value,
    }
)
        
if (resp.code === 0){
       alert('注册成功，点击确定，跳转到登录页');
        location.href = './login.html';
       } 
          };
          