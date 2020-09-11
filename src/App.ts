// 模拟组件返回vnode
const App = () => {
  return {
    type: 'marquee',
    attr: {
      style: {
        height: '66px',
        background: 'blue',
      },
    },
    children: [
      {
        type: null,
        attr: null,
        children: 'hi',
        $$typeof: Symbol.for('react.element'),
      },
    ],
    $$typeof: Symbol.for('react.element'),
  }
}

export default App()
