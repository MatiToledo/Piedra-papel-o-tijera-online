import { Router } from "@vaadin/router";
import { state } from "../../state";

export class Ready extends HTMLElement {
  connectedCallback() {
    const cs = state.getState();
    state.setState({
      ...cs,
      choice: "",
      rivalChoice: "",
      resultado: "",
    });
    state.getRoomInfo(() => {
      this.render();
    });
    state.listenReady();
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
        <my-text variant="large">Esperando a que ${cs.rivalName} presione ¡Jugar!...
        </my-text>
        
      </div>
      <custom-hands></custom-hands>
    </div>
    
    `;
  }
}
customElements.define("ready-page", Ready);
