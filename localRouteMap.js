import AAA from './src/pages/AAA/index';
import BBB from './src/pages/BBB/index';
import DDD from './src/pages/CCC/DDD/index';
import CCC from './src/pages/CCC/index';
import EEE from './src/pages/EEE/index';
import FFF from './src/pages/FFF/index';
export const routeMap = [
{path: '/aaa', component: AAA, exact: true},
{path: '/bbb', component: BBB, exact: true},
{path: '/ccc/ddd', component: DDD, exact: true},
{path: '/ccc', component: CCC, exact: true},
{path: '/eee', component: EEE, exact: true},
{path: '/fff', component: FFF, exact: true},
]