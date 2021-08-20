import { initRouter } from "../../router";
import { state } from "../../state";
const fondoURL = require("url:../../components/img/fondo.png");

export function waitingRoom(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");
  const cs = state.getState();
  const guestName = cs.guestName;

  //html
  div.innerHTML = `
    <div class="contenedor">
    <custom-header class="header"></custom-header>
    <div class="menu"> 
    <custom-text class="texto"> Esperando a que ${guestName} presione Jugar </custom-text>
    
    </div>
    <footer class="footer">
    <img-piedra class="pied"></img-piedra>
    <img-papel class="pied"></img-papel>
    <img-tijera class="pied"></img-tijera>
    
    
    
    </footer>
    </div>
    
    
    `;
  //style
  style.innerHTML = ` 
    .contenedor{
        display:flex;
        flex-direction:column;
        padding-left:34px;
        padding-right:34px;
        height: 100vh;
        justify-content: space-between;
        align-items:center;
       
        background-image: url(${fondoURL})
    }
    .header{
      height:100px;
    }
    .texto{
      width:284px;
      height:204px;
      text-align:center;
    }
    .menu{
        
        display:flex;
        flex-direction:column;
        height:500px;
        justify-content: center;
    }
    .pied{
      display:flex;

      width:200px;
      justify-content: center;
    }
    .footer{
      
      bottom:0px;
      width:100%;
      height:300px;
      display:flex;
      flex-direction:row;
      justify-content: space-around;
      align-items: flex-end;


    }
    `;

  div.appendChild(style);
  const intervalId = setInterval(() => {
    const cs = state.getState();
    state.listenRoom(() => {
      if (cs.guestOnline == true && cs.guestStart == "start") {
        clearInterval(intervalId);
        params.goTo("/selection");
      }
    });
  }, 1000);

  return div;
}
