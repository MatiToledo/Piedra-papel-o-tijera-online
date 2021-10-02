import { Router } from "@vaadin/router";
import { state } from "../../state";

export class Result extends HTMLElement {
  connectedCallback() {
    this.render();
    state.setWinner();
    // state.pushWinner();
    state.quitReady();
    setTimeout(() => {
      Router.go("/score");
    }, 3000);
  }
  render() {
    const cs = state.getState();
    const tijeraIMG = require("url:../../images/tijera.png");
    const piedraIMG = require("url:../../images/piedra.png");
    const papelIMG = require("url:../../images/papel.png");
    this.className = "result__container";
    const div = document.createElement("div");
    div.className = "rival-choice";

    if (cs.rivalChoice == "papel") {
      div.innerHTML = `
      <img class="my-choice" src=${papelIMG}> 
      `;
    }
    if (cs.rivalChoice == "piedra") {
      div.innerHTML = `
      <img class="my-choice" src=${piedraIMG}> 
      `;
    }
    if (cs.rivalChoice == "tijera") {
      div.innerHTML = `
      <img class="my-choice" src=${tijeraIMG}> 
      `;
    }

    if (cs.choice == "tijera") {
      this.innerHTML = `
      <img class="my-choice" src=${tijeraIMG}> 
      `;
    }
    if (cs.choice == "piedra") {
      this.innerHTML = `
      <img class="my-choice" src=${piedraIMG}> 
      `;
    }
    if (cs.choice == "papel") {
      this.innerHTML = `
      <img class="my-choice" src=${papelIMG}> 
      `;
    }
    this.appendChild(div);
  }
}
customElements.define("result-page", Result);
