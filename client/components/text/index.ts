export function init() {
  class TextComponent extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      const variant = this.getAttribute("variant") || "body";
      const shadow = this.attachShadow({ mode: "open" });
      const div = document.createElement("div");
      div.textContent = this.textContent;
      const style = document.createElement("style");
      style.innerHTML = `
          .title{
              font-family: "Noto Serif",serif;
              color:hsla(150, 100%, 28%, 1);
              
              font-size: 80px;
              font-style: normal;
              font-weight: 700;
              line-height: 70px;
              letter-spacing: 0em;
              text-align: left;
              


          }
          .body{
            font-family: 'Odibee Sans';
            
            font-size: 54px;
            font-style: normal;
            font-weight: 600;
            line-height: 40px;
            letter-spacing: 0em;
            text-align: center;
            



          }
        
        
        `;
      div.className = variant;
      shadow.appendChild(div);
      shadow.appendChild(style);
    }
  }
  customElements.define("custom-text", TextComponent);
}
