(async function(){
 //判断当前用户是否登入
const current=await API.currentUser();
if(current.code!==0){
alert('当前用户未登入或登入失败,请重新登入');
location.href='./login.html';
}
const doms={
aside:{asideName:$('.aside-name'),
      asideAccount:$('.aside-account'),
      close:$('.close'),
},
container:{
chatContainer:$('.chat-container'),
},
msgContainer:$('.msg-container'),
msgInput:$('input'),

}

//设置右边的名字和id
doms.aside.asideName.innerText=current.data.nickname;
doms.aside.asideAccount.innerText=current.data.loginId;


//右边关闭函数
doms.aside.close.addEventListener('click',async function(){
    await API.loginOut();
    location.href='./login.html';
})


//获取创建聊天
 function addChat(obj){
//创建div
const divItem=$$$('div');
divItem.classList.add('chat-item');
if( obj.from===current.data.loginId){
    divItem.classList.add('me');  
}

const imgItem=$$$('img');
imgItem.classList.add('chat-avatar');
if( obj.from===current.data.loginId){
    imgItem.src="./asset/avatar.png";
}else{
    imgItem.src="./asset/robot-avatar.jpg";
}

const divContent=$$$('div');
divContent.classList.add('chat-content');
divContent.innerText=obj.content;


const divDate=$$$('div');
divDate.classList.add('chat-date');
divDate.innerText=dataTimes(obj.createdAt);
 

//加入
doms.container.chatContainer.appendChild(divItem);
divItem.appendChild(imgItem);
divItem.appendChild(divContent);
divItem.appendChild(divDate);
 }
//日期函数
function dataTimes (time){
const date=new Date(time);
const year=date.getFullYear();
const month=(date.getMonth()+1).toString().padStart(2,'0');
const day=date.getDate().toString().padStart(2,'0');
const hours=date.getHours().toString().padStart(2,'0');
const minutes=date.getMinutes().toString().padStart(2,'0');
const second=date.getSeconds().toString().padStart(2,'0');

return `${year}-${month}-${day} ${hours}:${minutes}:${second}`;
}

//加载历史聊天记录
 async function chatHistory(){
const chatItemHistory=await API.historyChat();
 for (const item of chatItemHistory.data) {
     addChat(item);
 }
 //滚动的位置
doms.container.chatContainer.scrollTop=doms.container.chatContainer.scrollHeight;

}
await chatHistory();


//发消息
doms.msgContainer.addEventListener('submit',function(e){
    e.preventDefault();
    sendChat();
    doms.msgInput.value='';
});
 
//发消息函数
async function sendChat(){
const inputTxt=doms.msgInput.value.trim();
if(!inputTxt){
    return;
}
addChat({
content:inputTxt,
from:current.data.loginId,
to:null,
createdAt:Date.now(),
});
//滚动的位置
doms.container.chatContainer.scrollTop=doms.container.chatContainer.scrollHeight;
const resp= await API.chat(inputTxt);
console.log(resp);
addChat({
    content:resp.data.content,
    from:null,
    to:current.data.loginId,
    createdAt:Date.now(),
    });
//滚动的位置
doms.container.chatContainer.scrollTop=doms.container.chatContainer.scrollHeight;

}


 
})()

 