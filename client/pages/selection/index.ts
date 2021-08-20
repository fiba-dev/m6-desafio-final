import { initRouter } from "../../router";
import { state } from "../../state";
const fondoURL = require("url:../../components/img/fondo.png");

export function initselection(params) {
  const div = document.createElement("div");

  const style = document.createElement("style");

  div.innerHTML = `
    <div class="contenedor">
    <cont-ador class="contador">hola soy el contador</cont-ador>
    <footer class="footer">
    <div class="footer-div"><img-piedra class="pied" id="selection"></img-piedra></div>
    <div class="footer-div"><img-papel class="pied" id="selection"></img-papel></div>
    <div class="footer-div"> <img-tijera class="pied" id="selection"></img-tijera></div>
    </footer>
    </div>
    
    
    `;

  style.innerHTML = ` 
    
    .contenedor{
        display:flex;
        flex-direction:column;
        padding-left:34px;
        padding-right:34px;
        height: 100vh;
        justify-content: space-between;
       
        background-image: url(${fondoURL})
    }
   .footer-div{
     display:flex;
     width:300px;
     height:300px;
     justify-content: center;
     align-items: flex-end;
   }
    
    .pied{
      display:flex;

      
      justify-content: center;
    }
    .pied:hover{
      height:200px;
      width:200px;
      
      
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

  //evento que recibe la seleccion de piedra papel o tijera , lo envia al setMove del state y envia a la pagina "/resultado"
  const event = div.querySelectorAll("#selection");
  let validador = false;
  event.forEach((element) => {
    element.addEventListener("change", (e: any) => {
      validador = true;
      const event = new CustomEvent(`change`, {
        detail: {
          myPlay: e.detail.myPlay,
        },
      });
      const intervalId = setInterval(() => {
        const cs = state.getState();

        if (cs.guestPlay != "" && cs.userPlay != "") {
          clearInterval(intervalId);

          state.getHistory(params.goTo("/resultado"));
        }
      }, 1000);
      state.setMove(e.detail.myPlay);
    });
  });
  //evento que si no se hizo click antes de los 3 segundos vuelve a la pagina "/play" ,
  //se utilizo un booleano "validar" para verificar si se hizo click
  const contador = div.querySelector(".contador");
  const cs = state.getState();
  contador.addEventListener("end", () => {
    if (validador == false) params.goTo("/play");
    if (cs.guestPlay == "") {
      cs.userPlay = "";
      cs.guestPlay = "";
      cs.start = "on";
      cs.guestStart = "on";

      state.updateState(params.goTo("/play"));
    }
  });

  div.appendChild(style);

  return div;
}
