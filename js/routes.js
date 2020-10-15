import App from "./App.vue";
import PositionsTable from "./components/PositionsTable.vue";

export default [
  {
    path: "/",
    component: App,
  },
  {
    path: "/positions-table",
    component: PositionsTable,
  },
];
