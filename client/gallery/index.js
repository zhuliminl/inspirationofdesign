import * as actions from './actions.js';
import reducer from './reducer.js';
import view from './views/Gallery.js';

export { actions, reducer, view };  // 子模块中间过程全都导成抽象的 view，然后再在顶目录中导成具体的模块

// 模块命名避免耦合：具体模块 >> 抽象模块 >> 具体模块
