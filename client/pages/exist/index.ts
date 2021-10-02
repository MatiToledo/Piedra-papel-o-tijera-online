import { Router } from "@vaadin/router";
import { stat } from "fs";
import { state } from "../../state";

export class Exist extends HTMLElement {
  connectedCallback() {
    this.render();
    const form = document.querySelector(".exist__form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      state.setName(target.name.value);
      state.signIn(() => {
        state.getRTDBID(target.room.value, () => {
          state.connectoToRoom(() => {
            Router.go("/waiting");
          });
        });
      });
    });
  }
  render() {
    this.innerHTML = `
    <div class="new__container" >
      <div class="new__title"> 
        <my-text variant="title">Piedra, papel ó tijera</my-text>
      </div>
      <form class="exist__form">
        <div>
          <label class="new__label">Tu nombre</label>
        </div>
        <input class="new__input" type="text" name="name" placeholder="Inserte su nombre">
        <div>
          <label class="new__label">Sala</label>
        </div>
        <input class="new__input" type="text" name="room" placeholder="Inserte la sala">
        <button class="new__button">Empezar</button>
      </form>
      <custom-hands></custom-hands>
    </div>
    `;
  }
}
customElements.define("exist-page", Exist);
