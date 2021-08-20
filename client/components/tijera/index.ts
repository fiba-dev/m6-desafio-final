const tijeraURL = require("url:../img/tijera.png");

export function init() {
  class Tijera extends HTMLElement {
    constructor() {
      super();
      this.render();
    }

    render() {
      const shadow = this.attachShadow({ mode: "open" });
      const variant = this.getAttribute("variant") || "body";
      const img = document.createElement("div");
      img.innerHTML = `<a > <img src=${tijeraURL} class="tijera"></a>`;
      img.className = "imagen";

      const style = document.createElement("style");
      style.innerHTML = `
      .tijera{
        height:100%;
      
        -webkit-transition: all 1s ease;
        -moz-transition: all 1s ease;
        -ms-transition: all 1s ease;
        transition: all 1s ease;
        
    }
    .big__img{
      height:350px;
      width:160px;
      -webkit-transition: all 1s ease;
      -moz-transition: all 1s ease;
      -ms-transition: all 1s ease;
      transition: all 1s ease;

  }
    
      
      `;

      img.className = variant;
      shadow.appendChild(img);
      shadow.appendChild(style);
      const selection = img.querySelector(".tijera");
      selection.addEventListener("click", (res: any) => {
        const event = new CustomEvent(`change`, {
          detail: {
            myPlay: "tijera",
          },
        });
        this.dispatchEvent(event);
      });
    }
  }

  customElements.define("img-tijera", Tijera);
}
