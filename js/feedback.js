let response_div=document.querySelector("#response");
function hide(){
    response_div.classList.remove("visible");       
    response_div.classList.add("hidden");
    response_div.innerHTML="";
}
//response_div.addEventListener("transitionend",hide);
//response_div.addEventListener("transitioncancel",hide);

function feedback(msg){
    response_div.classList.remove("visible");   
    response_div.classList.remove("hidden");       
    response_div.classList.add("visible");   
    setTimeout(()=>{
        response_div.classList.remove("visible");       
        response_div.classList.add("hidden");    
    },3000);
    response_div.innerHTML =msg;
}

