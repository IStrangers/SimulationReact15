


# SimulationReact

## 介绍

SimulationReact 是一个用于学习和理解 React 内部工作原理的教学项目。它模拟了 React 核心功能，包括虚拟 DOM、组件生命周期、状态更新机制和合成事件系统。

通过阅读和分析这个项目的源代码，你可以深入了解 React 是如何工作的，包括：

- 虚拟 DOM 的创建和 diff 算法
- 类组件的生命周期方法
- 状态更新和批量更新机制
- 合成事件系统
- 组件渲染和更新流程

## 软件架构

### 核心模块

```
packages/
├── react/              # React 核心库
│   ├── index.ts        # 导出 createElement, createRef, createContext
│   └── src/
│       ├── component.ts    # 类组件实现及生命周期
│       ├── event.ts        # 合成事件系统
│       ├── updater.ts      # 状态更新队列和批量更新
│       └── vdom.ts         # 虚拟 DOM 实现
├── react-dom/          # DOM 渲染器
│   └── index.ts        # render 函数
├── shared/             # 共享工具函数
│   └── src/utils.ts    # 工具函数
└── types/              # 类型定义
    └── src/nodeType.ts # 节点类型常量
```

### 主要功能

- **虚拟 DOM**: 完整的虚拟 DOM 创建、对比和补丁应用机制
- **类组件**: 支持完整的生命周期方法（componentWillMount, componentDidMount, shouldComponentUpdate 等）
- **函数组件**: 支持函数组件的创建和渲染
- **状态管理**: 批量更新状态，支持 setState 和 forceUpdate
- **合成事件**: 跨浏览器兼容的事件系统
- **Context**: 上下文功能实现

## 安装教程

1. 确保已安装 Node.js 和 pnpm

```bash
# 安装依赖
pnpm install

# 构建项目
pnpm build
```

## 使用说明

### 基本示例

```javascript
import React from './packages/react';
import ReactDOM from './packages/react-dom';

// 创建组件
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    console.log('组件已挂载');
  }

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div onClick={this.handleClick}>
        Count: {this.state.count}
      </div>
    );
  }
}

// 渲染到 DOM
ReactDOM.render(<Counter />, document.getElementById('root'));
```

### 使用函数组件

```javascript
function FunctionComponent(props) {
  return <div>Hello, {props.name}!</div>;
}

ReactDOM.render(
  <FunctionComponent name="World" />,
  document.getElementById('root')
);
```

### 使用 createElement

```javascript
// 使用 createElement 创建元素
const element = React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, 'Hello')
);

ReactDOM.render(element, document.getElementById('root'));
```

### 使用 Ref

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    console.log(this.inputRef.current); // DOM 节点
  }

  render() {
    return <input ref={this.inputRef} />;
  }
}
```

### 使用 Context

```javascript
const ThemeContext = React.createContext('light');

class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  
  render() {
    return <button>Theme: {this.context}</button>;
  }
}

// 使用 Provider
<ThemeContext.Provider value="dark">
  <ThemedButton />
</ThemeContext.Provider>
```

## 项目结构说明

| 文件/目录 | 说明 |
|-----------|------|
| `packages/react/src/component.ts` | Component 类定义及所有生命周期方法 |
| `packages/react/src/vdom.ts` | 虚拟 DOM 核心实现，包括 diff 和 patch |
| `packages/react/src/updater.ts` | 状态更新队列和批量更新逻辑 |
| `packages/react/src/event.ts` | 合成事件系统 |
| `packages/react-dom/index.ts` | ReactDOM.render 方法 |

## 参与贡献

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request

## 许可证

MIT License