export function init() {
  class Contador extends HTMLElement {
    constructor() {
      super();
      this.render();
    }

    render() {
      const shadow = this.attachShadow({ mode: "open" });
      const img = document.createElement("div");
      let numero = 10;
      //intervalo que si "numero" es igual a 0 envia un customEvent
      const intervalID = setInterval((res) => {
        if (numero == 0) {
          clearInterval(intervalID);
          const event = new CustomEvent(`end`, {
            detail: {
              contador: numero,
            },
          });
          this.dispatchEvent(event);
        }

        //html
        img.innerHTML = `<div class="contenedor">
      <div class="menu"> 
      <div class="numero" id="numero" >${numero}</div> 
      
      </div>
      
      
      
      
      </footer>
      </div>
      
      `;
        //style
        img.className = "contador";

        const style = document.createElement("style");

        style.innerHTML = ` .numero{
        font-family: "Noto Serif",serif;
        font-size:200px;
      }
      .menu{
          margin-top:100px;
          display:flex;
          flex-direction:column;
          height:300px;
          
          justify-content: center;
      align-items: center;
      }
      `;

        shadow.appendChild(img);
        shadow.appendChild(style);

        numero--;
      }, 1000);
    }
  }

  customElements.define("cont-ador", Contador);
}
