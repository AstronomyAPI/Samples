import App from "./App.vue";
import Positions from "./components/Positions.vue";
import StarChart from "./components/StarChart.vue";

export default [
  {
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
];
