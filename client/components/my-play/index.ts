import { state } from "../../state";

export function myPlayComp() {
  customElements.define(
    "my-play",
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
          min-width: 250px;
          height: 252px;
          align-items: flex-end;
        }
        .tijera, .piedra, .papel{
          width: 55px;
          height: 126px;
        }
        
        `;

        const tijera = div
          .querySelector(".tijera")
          .addEventListener("click", () => {
            style.innerHTML = `
          .tijera{
            width: 110px;
            height: 252px;
          }
          .piedra ,.papel{
            filter: blur(2px);
          }
          .container{
            display: flex;
            justify-content: space-around;
            min-width: 250px;
            align-items: flex-end;
          }
          `;
            state.setMyPLay("tijera");
          });

        const piedra = div
          .querySelector(".piedra")
          .addEventListener("click", () => {
            style.innerHTML = `
          .piedra{
            width: 110px;
            height: 252px;
          }
          .tijera ,.papel{
            filter: blur(2px);
          }
          .container{
            display: flex;
            justify-content: space-around;
            min-width: 250px;
            align-items: flex-end;
          }
          `;
            state.setMyPLay("piedra");
          });

        const papel = div
          .querySelector(".papel")
          .addEventListener("click", () => {
            style.innerHTML = `
          .papel{
            width: 110px;
            height: 252px;
          }
          .tijera ,.piedra{
            filter: blur(2px);
          }
          .container{
            display: flex;
            justify-content: space-around;
            min-width: 250px;
            align-items: flex-end;
          }
          `;
            state.setMyPLay("papel");
          });

        shadow.appendChild(div);
        shadow.appendChild(style);
      }
    }
  );
}
