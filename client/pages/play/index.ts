import { initRouter } from "../../router";
import { state } from "../../state";
const fondoURL = require("url:../../components/img/fondo.png");

export function initPlay(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");

  //html
  div.innerHTML = `
    <div class="contenedor">
    <custom-header class="header"></custom-header>
    <div class="menu"> 
    <custom-text class="texto"> Presioná jugar
    y elegí: piedra, papel o tijera antes de que pasen los 3 segundos. </custom-text>
    <button-blue class="boton" >¡JUGAR!</button-blue>
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
    }
    .menu{
       
        display:flex;
        flex-direction:column;
        height:500px;
        justify-content: space-between
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
  //boton que lleva a la pagina para elegir piedra papel o tijera "/selection"
  const btn = div.querySelector(".boton");

  const cs = state.getState();
  cs.guestStart = "";
  cs.userPlay = "";
  cs.guestPlay = "";
  btn.addEventListener("click", () => {
    cs.start = "start";
    state.updateState(params.goTo("/waiting-room"));
  });

  return div;
}
