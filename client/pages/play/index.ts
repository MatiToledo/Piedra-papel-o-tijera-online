import { Router } from "@vaadin/router";
import { state } from "../../state";

export class Play extends HTMLElement {
  connectedCallback() {
    const cs = state.getState();
    this.render();
    setTimeout(() => {
      Router.go("/result");
    }, 5000);
    state.listenRivalChoice();
  }

  render() {
    this.innerHTML = `
    <div class="play__container">
      <div class="play__temporizador">
        <temp-el></temp-el>
      </div>
      <div class="play__hands">
        <my-play></my-play>
      </div>
    </div>
    `;
  }
}
customElements.define("play-page", Play);
