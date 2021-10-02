import { Router } from "@vaadin/router";

export class Home extends HTMLElement {
  connectedCallback() {
    this.render();

    const newButton = document.querySelector(".new-button");
    newButton.addEventListener("click", () => {
      Router.go("./new");
    });

    const existButton = document.querySelector(".exist-button");
    existButton.addEventListener("click", () => {
      Router.go("./exist");
    });
  }

  render() {
    this.innerHTML = `
    <div class="home__container">
      <div class="home__title">
        <my-text variant="title">Piedra, papel ó tijera</my-text>
      </div>
      <div class="home__buttons">
        <my-button class="new-button">Juego nuevo</my-button>
        <br>
        <my-button class="exist-button">Ingresar a una sala</my-button>
      </div>
      <custom-hands></custom-hands> 
    </div>
    `;
  }
}
customElements.define("home-page", Home);
