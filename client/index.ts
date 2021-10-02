import { state } from "./state";
import "./router";

import "./pages/home/index";
import "./pages/new/index";
import "./pages/exist/index";
import "./pages/waiting/index";
import "./pages/ready/index";
import "./pages/play/index";
import "./pages/result/index";
import "./pages/score/index";

import { TextComp } from "./components/text";
import { buttonComp } from "./components/button";
import { handsComp } from "./components/hands";
import { TempComp } from "./components/temporizador";
import { myPlayComp } from "./components/my-play";
import { resultPosterComp } from "./components/result-poster";

(function () {
  if (localStorage["local-storage"] == null) {
    state.setState(state.data);
  }
  state.init();
  TextComp();
  buttonComp();
  handsComp();
  TempComp();
  myPlayComp();
  resultPosterComp();
})();
