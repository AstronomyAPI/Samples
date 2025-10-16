import App from "./App.vue";
import Positions from "./components/Positions.vue";
import StarChart from "./components/StarChart.vue";
import MoonPhase from "./components/MoonPhase.vue";
import Search from "./components/Search.vue";

export default [
  {
    name: "home",
    path: "/",
    component: App,
  },
  {
    path: "/positions",
    component: Positions,
  },
  {
    path: "/star-chart",
    component: StarChart,
  },
  {
    path: "/moon-phase",
    component: MoonPhase,
  },
  {
    path: "/search",
    component: Search,
  },
];
