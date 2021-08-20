const piedraURL = require("url:../img/piedra.png");

export function init() {
  class Piedra extends HTMLElement {
    constructor() {
      super();
      this.render();
    }

    render() {
      const shadow = this.attachShadow({ mode: "open" });
      const variant = this.getAttribute("variant") || "body";
      const img = document.createElement("div");
      img.innerHTML = `<a > <img src=${piedraURL} class="piedra" ></a>`;
      img.className = "imagen";

      const style = document.createElement("style");
      style.innerHTML = `
      .piedra{
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

      const selection = img.querySelector(".piedra");
      selection.addEventListener("click", (res: any) => {
        const event = new CustomEvent(`change`, {
          detail: {
            myPlay: "piedra",
          },
        });
        this.dispatchEvent(event);
      });

      img.className = variant;
      shadow.appendChild(img);
      shadow.appendChild(style);
    }
  }

  customElements.define("img-piedra", Piedra);
}
