import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/new", component: "new-page" },
  { path: "/exist", component: "exist-page" },
  { path: "/waiting", component: "waiting-page" },
  { path: "/ready", component: "ready-page" },
  { path: "/play", component: "play-page" },
  { path: "/result", component: "result-page" },
  { path: "/score", component: "score-page" },
]);
