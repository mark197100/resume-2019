
var APP_ID = 'FJF29KzvGEHHqJ8YBLBXuvC5-gzGzoHsz';
var APP_KEY = 'iBN8pCPFYD0M5iEnyQmS8mBo';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});



let myForm = document.querySelector('#postMessageForm')

myForm.addEventListener('submit',function(e){
    e.preventDefault()
    let content = myForm.querySelector('input[name=content]').value
    var Message = AV.Object.extend('message');
    var message = new Message;
    message.save({
        'content':content
    }).then(function(object){
        let li = document.createElement('li')
        li.innerText = object.attributes.content
        let messageList = document.querySelector('#messageList')
        myForm.querySelector('input[name=content]').value=""
        messageList.appendChild(li)
    })
})

var query = new AV.Query('message');
query.find().then(
    function(messages){
        console.log(messages)
        let array = messages.map((item)=> item.attributes)
        array.forEach((item)=>{
            let li = document.createElement('li')
            li.innerText = item.content
            let messageList = document.querySelector('#messageList')
            messageList.appendChild(li)
            
        })
    },
    function(error){
        alert('提交失败')
    }
)
