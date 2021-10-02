import { state } from "../../state";

export function resultPosterComp() {
  customElements.define(
    "result-poster",
    class extends HTMLElement {
      constructor() {
        super();
        this.render();
      }
      render() {
        const cs = state.getState();

        const shadow = this.attachShadow({ mode: "open" });
        const div = document.createElement("div");
        const style = document.createElement("style");

        div.innerHTML = `
        <div class="${cs.resultado}">
          <my-text id="text" variant="title">${cs.resultado}</my-text>
        </div>
        <br>
        <div class="container">
          <my-text variant="title">Score</my-text>
          <div class="score">
            <my-text variant="large">${cs.name}: ${cs.score}</my-text>
            <my-text variant="large">${cs.rivalName}: ${cs.rivalScore}</my-text>
          </div>
        </div>
        `;

        style.innerHTML = `
        * {
        box-sizing: border-box;
        } 
        #text{
          color: white;
        }
        .Ganaste{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 150px;
          border-radius: 10px;
          background-color: rgba(94, 255, 88);
        }
        .Perdiste{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 150px;
          border-radius: 10px;
          background-color: rgb(255, 80, 79);
        }
        .Empate{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 150px;
          border-radius: 10px;
          background-color: rgb(255, 233, 95);
        }
        .container{
          background-color: white;
          border: solid 5px;
          padding: 10px;
          border-radius: 10px;
        }
        .score{
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        `;
        shadow.appendChild(div);
        shadow.appendChild(style);
      }
    }
  );
}
