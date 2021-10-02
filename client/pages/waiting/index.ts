import { Router } from "@vaadin/router";
import { state } from "../../state";

export class Waiting extends HTMLElement {
  connectedCallback() {
    state.getRoomInfo(() => {
      this.render();
      const button = document.querySelector(".set-ready");
      button.addEventListener("click", () => {
        state.setReady();
        Router.go("/ready");
      });
    });
  }
  render() {
    const cs = state.getState();

    this.innerHTML = `
    <div class="waiting__container">
      <div class="waiting__info">
        <div class="names-container">
          <my-text>${cs.name}: ${cs.score}</my-text>
          <my-text>${cs.rivalName}: ${cs.rivalScore}</my-text>
        </div>
        <div class="room-container">
          <my-text>Sala:</my-text>
          <my-text>${cs.shortId}</my-text>
        </div>
      </div>
      <div class="waiting__menu">
        <my-text variant="large">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</my-text>
        <my-button class="set-ready">¡Jugar!</my-button>
      </div>
      <custom-hands></custom-hands>
    </div>
    
    `;
  }
}
customElements.define("waiting-page", Waiting);
