const wsUri = "wss://echo-ws-service.herokuapp.com";
const output = document.getElementById("output");
const btnGeo = document.querySelector('.j-btn-geo');
const btnSend = document.querySelector('.j-btn-send');
let websocket;

websocket = new WebSocket(wsUri);

function writeToScreen(message, alignment) {
  let pre = document.createElement("div");
   if (alignment ==="right") {
    pre.style.marginLeft ="50%";
    pre.style.textAlign = "end";
  } else {
    pre.style.marginRight ="50%";
  };
  pre.innerHTML = message;
  output.appendChild(pre);
}

const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  const url =  `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  const geo =`
  <a href="${url}"> Гео-локация</a>
  `; 
  
  writeToScreen('<p style="display: inline-block; border: 3px solid rgb(160, 215, 236); border-radius: 7px;  padding: 5px 5px">' +  geo+ '</p>'
    ,"right");
}

btnGeo.addEventListener('click', () => {

  if (!navigator.geolocation) {
    console.log("Geolocation не поддерживается вашим браузером");
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

btnSend.addEventListener('click', () => {
  const message = document.querySelector('input').value;
  writeToScreen('<p style="display: inline-block; border: 3px solid rgb(160, 215, 236); border-radius: 7px;  padding: 5px 5px">' +  '<span style = color:blue;>Сообщение отправителя: </span>'+ message +'</p>'
    ,"right");
  websocket.send(message);
  websocket.onmessage = function(evt) {
    writeToScreen(
      '<p style="display: inline-block; border: 3px solid rgb(160, 215, 236); border-radius: 7px;  padding: 5px 5px">' + '<span style = color:blue;>Сообщение сервера: </span>' + evt.data+'</p>'
  ,"left");
  };
});
