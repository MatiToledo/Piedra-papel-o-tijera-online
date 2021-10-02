export function TextComp() {
  customElements.define(
    "my-text",
    class extends HTMLElement {
      constructor() {
        super();
        this.render();
      }
      render() {
        const shadow = this.attachShadow({ mode: "open" });
        const div = document.createElement("div");
        const variant = this.getAttribute("variant") || "body";
        const style = document.createElement("style");

        style.innerHTML = `
        .title{
          text-align: center;
          font-family: "Poppins";
          font-size: 52px;
          font-weight: 700;
        }
        .large{
          text-align: center;
          font-family: "Poppins";
          font-size: 30px;
          font-weight: 500;
        }
        .body{
          font-family: "Poppins";
          font-size: 18px;
          font-weight: 400;
          text-align: center;
        }
        `;

        div.className = variant;
        div.textContent = this.textContent;
        shadow.appendChild(div);
        shadow.appendChild(style);
      }
    }
  );
}
