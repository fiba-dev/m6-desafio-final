const fondoURL = require("url:../../components/img/fondo.png");
import { initRouter } from "../../router";
import { state } from "../../state";

export function selectRoom(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");
  const cs = state.getState();
  //html
  div.innerHTML = `
    <div class="contenedor">
    <div class="menu"> 
    <custom-text class="texto" variant="title"> Piedra Papel o Tijera </custom-text>
    <input-text id="input">código</input-text>
    <button-blue class="boton2" >Ingresar a una sala</button-blue>
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
    .texto{
      width:284px;
      
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

  //boton para navegar a la siguiente pagina donde da instrucciones "/play"
  const btn = div.querySelector(".boton2");

  const input = div.querySelector("#input");
  input.addEventListener("awesome", (res: any) => {
    cs.roomId = res.detail.text;
  });

  btn.addEventListener("click", () => {
    params.goTo("/input-name");
  });

  return div;
}
