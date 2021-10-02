import { Router } from "@vaadin/router";

export function TempComp() {
  customElements.define(
    "temp-el",
    class extends HTMLElement {
      constructor() {
        super();
        this.render();
      }
      render() {
        const shadow = this.attachShadow({ mode: "open" });
        const div = document.createElement("div");
        let counter: number = 3;

        const style = document.createElement("style");

        style.innerHTML = `
        .count{
          margin-top: 22px;
          text-align: center;
          font-family: "Poppins";
          font-size: 70px;
          font-weight: 700;
        }
        .circle{
          width: 150px;
          height: 150px;
          border: 10px solid;
          border-radius: 50%;
        }
        `;

        div.innerHTML = `
        <div class="circle">
          <p class="count"></p>
        </div>
        `;

        const p = div.querySelector(".count");
        const intervalId = setInterval(() => {
          p.textContent = counter.toString();
          if (counter == 0) {
            clearInterval(intervalId);
            shadow.removeChild(div);
          }
          counter--;
        }, 1000);

        shadow.appendChild(div);
        shadow.appendChild(style);
      }
    }
  );
}
