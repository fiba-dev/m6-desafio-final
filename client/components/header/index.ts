import { state } from "../../state";
export function init() {
  class Headercustom extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      const shadow = this.attachShadow({ mode: "open" });
      const div = document.createElement("header");
      const cs = state.getState();
      const score = state.getScore();
      const style = document.createElement("style");
      div.innerHTML = `
      <div class="contenedor">
        <div>
        <h3 class="title">${cs.userName}:${score.myScore}</h3>
         <h3 class="guest">${cs.guestName}:${score.guestScore}</h3>
         </div>
         <div>
         <h3 class="title">Sala</h3>
         <h3 class="title">${cs.roomId}</h3>
         </div>
         </div>
        `;
      style.innerHTML = `
           .guest{
                 margin:5px;
                 color: #FF6442;
           }
           .title{
               margin:5px;
           }
            .contenedor{
                display:flex;
                justify-content: space-around;
                width:375px;
                height:100px;
              font-family: 'Odibee Sans';
              
              font-size: 24px;
              font-style: normal;
              
            
              
              text-align: center;
              
  
  
  
            }
          
          
          `;

      shadow.appendChild(div);
      shadow.appendChild(style);
    }
  }
  customElements.define("custom-header", Headercustom);
}
