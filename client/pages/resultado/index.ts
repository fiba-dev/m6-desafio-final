import { initRouter } from "../../router";
import { state } from "../../state";
const empateURL = require("url:../../components/img/empate.png");
const fondoURL = require("url:../../components/img/fondo.png");
const ganasteURL = require("url:../../components/img/ganaste.png");
const perdisteURL = require("url:../../components/img/perdiste.png");

export function initResultado(params) {
  const div = document.createElement("div");
  const myPlay = document.createElement("div");
  const style = document.createElement("style");
  const computerPlay = document.createElement("div");
  const stateComputer = state.getState().guestPlay;
  const stateMyPlay = state.getState().userPlay;
  const cs = state.getState();
  const score = state.getScore();
  //Seleccion de la maquina y del jugador
  if (stateMyPlay == "piedra")
    myPlay.innerHTML = `<img-piedra class="eleccion" variant="big__img" id="selection"></img-piedra>`;
  if (stateMyPlay == "papel")
    myPlay.innerHTML = `<img-papel class="eleccion" variant="big__img" id="selection"></img-papel>`;
  if (stateMyPlay == "tijera")
    myPlay.innerHTML = `<img-tijera class="eleccion" variant="big__img" id="selection"></img-tijera>`;
  if (stateComputer == "piedra")
    computerPlay.innerHTML = `<img-piedra class="eleccion" variant="big__img" id="selection"></img-piedra>`;
  if (stateComputer == "tijera")
    computerPlay.innerHTML = `<img-tijera class="eleccion" variant="big__img" id="selection"></img-tijera>`;
  if (stateComputer == "papel")
    computerPlay.innerHTML = `<img-papel class="eleccion" variant="big__img" id="selection"></img-papel>`;

  //html
  div.innerHTML = `
    <div class="contenedor">
    <div class="cartel">
    
    <img class="imagen" src=""></img>
    <div class="score">
    <p class="title">Score</p>
    <label>${cs.userName}:${score.myScore}</label>
    <label>${cs.guestName}:${score.guestScore}</label>
    <label>Empates:${score.empates}</label>
    
    </div>
    <button-blue class="boton1" >Volver a jugar</button-blue>
    </div>
    
    
    <div class="maquina"></div>
    
    <div class="play"></div>
    
   
    </div>
    
    
    `;
  //style del html
  style.innerHTML = ` 
    
    .contenedor{
        display:flex;
        flex-direction:column;
        padding-left:34px;
        padding-right:34px;
        height: 100vh;
        justify-content: space-between;
        align-items: center;
        background-image: url(${fondoURL})
    }
    .play{
      display:flex;
      height:500px;
      width:100%;
      align-items: flex-end;
      justify-content: center;
      
    }
    .maquina{
      
      transform: rotate(180deg);
      z-index:0;
    }
    .eleccion{
      height:400px;
      width:200px;
    }
    .cartel{
      display: flex;
      flex-direction: column;
      position: absolute;
      top:0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      z-index:1;
      justify-content: space-around;
    align-content: stretch;
    align-items: center;
      

      
      
      background: rgba(136, 137, 73,0.9);


      display:none;
    }
    
    .score{
      display:flex;
      flex-direction:column;
      width: 259px;
      height: 280px;
      left: 58px;
      top: 307px;

      background: #FFFFFF;
      border: 10px solid #000000;
      box-sizing: border-box;
      border-radius: 10px;
      font-family: 'Odibee Sans', cursive;
      font-size:48px;
      text-align:center;
      overflow:hidden;

    }
    .title{
      font-size:64px;
    }
   
    .boton-delete{
      background:none;
      
     
      color:white;

    }
    
    `;

  //si selecciona le muestra el resultado
  const maquina = div.querySelector(".maquina");

  const footer = div.querySelector(".play");

  const btn = div.querySelector(".boton1");

  btn.addEventListener("click", (res) => {
    params.goTo("/play");
  });
  //boton delete elimina el score
  const btndlt = div.querySelector(".boton-delete");

  div.appendChild(style);
  maquina.appendChild(computerPlay);
  footer.appendChild(myPlay);
  //interval para mostrar el resultado
  const myIntervalProcess = setInterval(() => 5000);
  const cartel: any = div.querySelector(".cartel");
  const imagen: any = div.querySelector(".imagen");

  //dependiendo de quien gane segun el metodo "whoWins" del state sera el cartel que salga
  setTimeout(() => {
    clearInterval(myIntervalProcess);

    cs.guestStart = "off";
    cs.start = "off";
    state.updateState(state.getHistory(() => {}));

    if (
      state.whoWins(state.getState().userPlay, state.getState().guestPlay) ==
      "ganaste"
    ) {
      cartel.style.display = "inherit";
      imagen.src = ganasteURL;
      cartel.style.background = "rgba(136, 137, 73,0.9)";
    }
    if (
      state.whoWins(state.getState().userPlay, state.getState().guestPlay) ==
      "perdiste"
    ) {
      cartel.style.display = "inherit";
      imagen.src = perdisteURL;
      cartel.style.background = "rgba(137, 73, 73, 0.9)";
    }
    if (
      state.whoWins(state.getState().userPlay, state.getState().guestPlay) ==
      "empataste"
    ) {
      cartel.style.display = "inherit";
      imagen.src = empateURL;
      cartel.style.background = "rgba(255, 233, 0, 0.5)";
    }
  }, 1000);

  return div;
}
