const API = "https://script.google.com/macros/s/AKfycbwxnABZcpagY8KkXLhZYyC0VD0mufdoHR-TjMCtVGMABoLG5O7El0Iq-rH1HkMlIA5xYA/exec";
let USER = "";

function val(id){ return document.getElementById(id).value; }

function register(){
  send("register");
}

function login(){
  send("login");
}

function send(action){
  fetch(API,{
    method:"POST",
    body:JSON.stringify({
      action,
      username:val("u"),
      password:val("p"),
      pin:val("pin")
    })
  }).then(r=>r.json()).then(d=>{
    if(d.status==="success" && action==="login"){
      USER = val("u");
      document.getElementById("login").hidden = true;
      document.getElementById("dash").hidden = false;
      document.getElementById("bal").innerText = d.balance;
      history();
    } else {
      document.getElementById("msg").innerText = d.message;
    }
  });
}

function transfer(){
  fetch(API,{
    method:"POST",
    body:JSON.stringify({
      action:"transfer",
      username:USER,
      to:val("to"),
      amount:val("amount")
    })
  }).then(r=>r.json()).then(d=>{
    alert(d.message);
    history();
  });
}

function history(){
  fetch(API,{
    method:"POST",
    body:JSON.stringify({
      action:"history",
      username:USER
    })
  }).then(r=>r.json()).then(d=>{
    const h=document.getElementById("history");
    h.innerHTML="";
    d.history.forEach(x=>{
      const li=document.createElement("li");
      li.innerText=`${x[0]} → ${x[1]} : ${x[2]}€`;
      h.appendChild(li);
    });
  });
}
