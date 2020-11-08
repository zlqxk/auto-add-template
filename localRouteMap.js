import AAA from "./src/pages/AAA";
import BBB from "./src/pages/BBB";
import CCC from "./src/pages/CCC";
import DDD from "./src/pages/CCC/DDD";

const routeMap = [
  // { path: "/home", component: Home, exact: true },
  { path: "/aaa", component: AAA, exact: false },
  { path: "/bbb", component: BBB, exact: false },
  { path: "/ccc", component: CCC, exact: false },
  { path: "/ddd", component: DDD, exact: false },
];

export default routeMap;
