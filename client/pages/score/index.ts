import { Router } from "@vaadin/router";
import { state } from "../../state";

export class Score extends HTMLElement {
  connectedCallback() {
    this.render();
    state.pushWinner();
    const button = document.querySelector(".quit-ready");
    button.addEventListener("click", () => {
      Router.go("/waiting");
    });
  }
  render() {
    const cs = state.getState();
    this.className = "score-container";

    this.innerHTML = `
    <result-poster></result-poster>
    <br>
    <my-button class="quit-ready">Volver a jugar</my-button>
    `;
  }
}
customElements.define("score-page", Score);
