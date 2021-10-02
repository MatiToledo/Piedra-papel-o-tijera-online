export function handsComp() {
  customElements.define(
    "custom-hands",
    class extends HTMLElement {
      constructor() {
        super();
        this.render();
      }
      render() {
        const shadow = this.attachShadow({ mode: "open" });
        const div = document.createElement("div");
        const tijeraIMG = require("url:../../images/tijera.png");
        const piedraIMG = require("url:../../images/piedra.png");
        const papelIMG = require("url:../../images/papel.png");
        div.className = "container";

        div.innerHTML = `
        <img class="tijera" src=${tijeraIMG}>
        <img class="piedra" src=${piedraIMG}>
        <img class="papel" src=${papelIMG}>
        `;

        const style = document.createElement("style");
        style.innerHTML = `
        .container{
          display: flex;
          justify-content: space-around;
          min-width: 250px
        }
        
        `;

        shadow.appendChild(div);
        shadow.appendChild(style);
      }
    }
  );
}
