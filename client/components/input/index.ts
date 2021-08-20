export function init() {
  class Input extends HTMLElement {
    constructor() {
      super();
      this.render();
    }

    render() {
      const shadow = this.attachShadow({ mode: "open" });
      const input = document.createElement("input");
      input.placeholder = this.textContent;

      const style = document.createElement("style");
      input.className = "boton";

      style.innerHTML = ` 
      .boton{
        font-family: 'Odibee Sans', cursive;
        font-size:30px;
          height:87px;
          width:100%;
          
          text-align:center;
          
          background: #FFFFFF;
          border: 10px solid #182460;
          
          box-sizing: border-box;
          border-radius: 10px;
          margin-top:20px;
  
      }
           
  
      `;

      shadow.appendChild(input);
      shadow.appendChild(style);
      const ingreso = shadow.querySelector(".boton");
      ingreso.addEventListener("input", (res: any) => {
        const event = new CustomEvent(`awesome`, {
          detail: {
            text: res.target.value,
          },
        });
        console.log("evento a despachar", res.target.value);
        this.dispatchEvent(event);
      });
    }
  }

  customElements.define("input-text", Input);
}
