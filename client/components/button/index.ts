export function buttonComp() {
  customElements.define(
    "my-button",
    class extends HTMLElement {
      constructor() {
        super();
        this.render();
      }
      render() {
        const shadow = this.attachShadow({ mode: "open" });
        const button = document.createElement("button");
        const style = document.createElement("style");

        style.innerHTML = `
          .button{
            border: none;
            border-radius: 10px;
            font-family: "Poppins";
            font-size: 18px;
            font-weight: 400;
            background-color: #9CBBE9;
            width: 100%;
            height: 55px;
            margin: 10px 0
          }
          
        `;

        button.className = "button";
        button.textContent = this.textContent;
        shadow.appendChild(button);
        shadow.appendChild(style);
      }
    }
  );
}
