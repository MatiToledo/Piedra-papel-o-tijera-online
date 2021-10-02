import { Router } from "@vaadin/router";
import { state } from "../../state";

export class New extends HTMLElement {
  connectedCallback() {
    this.render();
    const form = document.querySelector(".new__form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      state.setName(target.name.value);
      state.signIn(() => {
        state.createRoom(() => {
          Router.go("/waiting");
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
      <form class="new__form">
        <div>
          <label class="new__label">Tu nombre</label>
        </div>
        <input class="new__input" type="text" name="name" placeholder="Inserte su nombre">
        
        <button class="new__button">Empezar</button>
      </form>
      <custom-hands></custom-hands>
    </div>
    `;
  }
}
customElements.define("new-page", New);
