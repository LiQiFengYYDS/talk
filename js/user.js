// //注册和登入的通用代码
 

class FieldValidator{
//构造器
// txtId是input的id  validatorFun是回调函数 验证规则函数
constructor(txtId,validatorFunc){
//文本获取
this.input=$('#'+txtId);
this.validatorFunc=validatorFunc;
this.p =this.input.nextElementSibling;
this.input.onblur=()=>{this.validate()};

}
//验证
async validate(){
//调用验证规则函数
const err=await this.validatorFunc(this.input.value);
//判断 设置p的文本 判断规则函数的返回值是否有值，有值表示有错误
if(err){
this.p.innerText=err;
return false;
}else{

 this.p.innerText='';
    return true;
}

}

static async validate(...arrs){
const proms= arrs.map((v)=>v.validate());
const pro=await Promise.all(proms);
return  pro.every(r=>r);
}

}

