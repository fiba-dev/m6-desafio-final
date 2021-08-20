import { initRouter } from "../../router";
const fondoURL = require("url:../../components/img/fondo.png");
import { state } from "../../state";

export function shareCode(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");

  const cod = state.getState();

  //html
  div.innerHTML = `
    <div class="contenedor">
    <div class="menu"> 
    <custom-text class="texto"> Comparti el codigo: </custom-text>
    <h2 class="texto2">${cod.roomId}</h2>
    <custom-text class="texto" >con tu contrincante</custom-text>
    
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
    
    .texto2{
        color:red;
        font-size:58px;
        font-family: 'Odibee Sans', cursive;
        text-align:center;
    }
    .menu{
        margin-top:100px;
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

  const intervalId = setInterval(() => {
    const cs = state.getState();

    if (cs.guestOnline == true) {
      clearInterval(intervalId);
      params.goTo("/play");
    }
  }, 1000);

  return div;
}
