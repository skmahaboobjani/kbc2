var question= document.getElementById("question");
var optionA=document.getElementById("optionA");
var optionB=document.getElementById("optionB");
var optionC=document.getElementById("optionC");
var optionD=document.getElementById("optionD");
var container =document.querySelector(".container");
var timeh = document.getElementById("timeh");
var progress=document.querySelector(".progress");
var Ans;
var time=30;
var interval,interval1;
var result= document.querySelector(".result");
var resulth2=document.getElementById("result-h2");
let i=0;
var options=[optionA,optionB,optionC,optionD];
var data;
var prize =0;
var width=0;

fetch('script.json')
.then(data=>{
   return data.json();
})
.then(data1=>{
        data=data1;
       
        addevent(options);
        interval=setInterval(()=>{
         time=time-1;
         getquestion(data,i);
         },1000);

        interval1=setInterval(()=>{
           if(width==2000){
              clearInterval(interval1);
           }
           else{
                width=width+1;
               progress.style.width=width+"px";
              }
        },28.5);
});


function getquestion(data,i){
  question.innerText= data[i].q;
  optionA.innerText=data[i].options[0].optionA;
  optionB.innerText=data[i].options[1].optionB;
  optionC.innerText=data[i].options[2].optionC;
  optionD.innerText=data[i].options[3].optionD;
  Ans=data[i].Ans;
  if(time<0){
       clearInterval(interval);
       clearInterval(interval1);
       container.style.display="none";
       resulth2.innerText="Bye! Bye!  you will lose the game "+prize;
       result.style.display="flex";
       progress.style.backgroundColor="#ff165d";
       progress.style.width="81vw"
      }
  else{
        timeh.innerText=time;
      }
  }

function addevent(a){
   a.forEach(element => {
      element.addEventListener('click',(e)=>{
         if(e.target.innerText==Ans && i<5){
            prize=prize+1000;
            i=i+1;
            time=30;
            width=0;
            progress.style.width=width;
            console.log(i);
            getquestion(data,i);
         }
         else if(e.target.innerText==Ans && i==5){
            console.log(e.target.innerText,Ans);
            container.style.display="none";
            resulth2.innerText="Bye! Bye! Your the Winner! Your prize Amount is INR 6000";
            result.style.display="flex";
            result.style.height="60vh";
            progress.style.display="none";
           
         }
         else if(e.target.innerText!=Ans){
            console.log("else");
            container.style.display="none";
            resulth2.innerText="Bye! Bye!  You will lose the prize amount "+prize;
            result.style.display="flex";
            result.style.height="60vh";
            progress.style.display="none";
         }
      });
      
   });
}
  