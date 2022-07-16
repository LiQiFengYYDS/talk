
 var API= (function(){

    const  WEBSITE_uRL='https://study.duyiedu.com';
    const TOKEN='token';
    function get(path){
    const headers={};
    const token=localStorage.getItem(TOKEN);
    if(token){
        headers.authorization=`Bearer ${token}`;
    }
    return fetch(WEBSITE_uRL+path,{
    headers
    });
    }
    
    
    function post(path,objItem){
        const headers={'content-type':'application/json'};
        const token=localStorage.getItem(TOKEN);
        if(token){
            headers.authorization=`Bearer ${token}`;
        }
        return fetch(WEBSITE_uRL+path,{headers:headers,
        method:'POST',
        body:JSON.stringify(objItem),
    })
        }
    
    
    //注册
    async  function reg(objReg){
    //  const result= await fetch(WEBSITE_uRL+'/api/user/reg',{
    //      method:"POST",
    //      headers:{'content-type':'application/json'},
    //      body:JSON.stringify(objReg),
    //     });   //返回服务器的结果
    // const res =await result.json();//解析结果
    // return res;
     const result= await post('/api/user/reg',objReg);   //返回服务器的结果
    const res =await result.json();//解析结果
    return res;
    
    
    
    }
    //登入
    async   function login(objLogin){
    //     const result= await fetch(WEBSITE_uRL+'/api/user/login',{
    //         method:"POST",
    //         headers:{'content-type':'application/json'},
    //         body:JSON.stringify(objLogin),
    //        });   //返回服务器的结果
    //    const res =await result.json();//解析结果
    //    const tokenValue=result.headers.get('authorization');
    //    if(res.code===0){
    //     localStorage.setItem(TOKEN,tokenValue);
    //    }
    //    return res;
       
        const result= await post('/api/user/login',objLogin);   //返回服务器的结果
       const res =await result.json();//解析结果
       const tokenValue=result.headers.get('authorization');
       if(res.code===0){
        localStorage.setItem(TOKEN,tokenValue);
       }
       return res;
       
    
    
    }
    //验证
    async function checking(loginId){
        const result= await get('/api/user/exists?loginId='+loginId);   //返回服务器的结果
       const res =await result.json();//解析结果
       return res;
    }
    //当前用户
     async function currentUser(){
        const result= await get('/api/user/profile');   //返回服务器的结果
        const res =await result.json();//解析结果
        return res;
    
    
    
    }
    //发送聊天消息
    async function chat(content){
        const result= await post('/api/chat',{content:content});   //返回服务器的结果
        const res =await result.json();//解析结果
        return res;
         
    }
    //获取聊天记录 
    async function historyChat(){
        const result= await get('/api/chat/history');   //返回服务器的结果
        const res =await result.json();//解析结果
        return res;
    }
    
    //注销
    function loginOut(){
        localStorage.removeItem(TOKEN);
    }





return{
    reg,
    login,
    checking,
    currentUser,
    chat,
    historyChat,
    loginOut,
}




})()


