let email=document.querySelector("#email");
  let pw=document.querySelector("#password");
  let name=document.querySelector("#fullname");
  let emailerrors=document.querySelector("#emailerrors");
  let pwerrors=document.querySelector("#pwerrors");
  let nameerrors=document.querySelector("#nameerrors");

  let submit=document.querySelector("#submit");
  
  pw.addEventListener("click",validateEmail);
  let email_ok=false;
  let pw_ok=false;
  let name_ok=false;
  let attach=true;
  function validate(){
    if (email_ok&&pw_ok&&name_ok){
     submit.style="";
     submit.disabled=false;
      submit.setAttribute("onmouseover","");
    console.log("validated good");
    }else{
      submit.disabled=true;
       submit.style="{color:crimson;border-color:crimson}:hover {background-color: grey}"
      submit.setAttribute("onmouseover","this.style.backgroundColor='crimson'");
    }
  }
validate();
  submit.addEventListener('click',validate);
  email.addEventListener("input",validateEmail);
  email.addEventListener("input",validatePw);
function validateEmail() 
{
    var re = /\S+@\S+\.\S+/;
    if(!re.test(email.value)){
      emailerrors.innerHTML='email format is extected to be <strong style="color:white;text-decoration:underline;" >example@something.com</strong>'
      console.log("checked bad");
      email_ok=false;
    }else{
      emailerrors.innerHTML="";
    console.log("checked good");
    email_ok=true;
    }
    validate();
}

function validatePw() 
{
  pw_ok=pw.value.length>=4;
  if(!pw_ok){
    pwerrors.innerHTML="password too short"
  }else{
    pwerrors.innerHTML="";
  }
  validate();
}
function validateName() 
{
  name_ok=name.value.length>=2;
  if(!name_ok){
    nameerrors.innerHTML="name too short"
  }else{
    nameerrors.innerHTML="";
  }
  validate();
}
pw.addEventListener("input",validatePw);
if(name!=null)
name.addEventListener("input",validateName);
else{
    name_ok=true;
}

function feedback(msg){
  response_div.innerHTML =msg;
                  response_div.classList.add("hidden");
                  setTimeout(() => {
                      response_div.classList.remove("hidden");
                      response_div.innerHTML = "";
                      response_div.style.visibility = "visible";
                  }, 4000);
}