// 模拟组件返回vnode
const App = () => {
  // 普通标签 vnode
  const createElement = {
    type: 'marquee',
    attr: {
      style: {
        height: '66px',
        color: '#fff',
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

  // fragment vnode
  const createFragment = {
    type: Symbol.for('react.fragment'),
    attr: null,
    children: [
      {
        type: 'p',
        attr: {
          style: {
            height: '66px',
            textAlign: 'center',
            color: '#fff',
            background: 'green',
          },
        },
        children: [{ type: null, attr: null, children: 'fragment' }],
        $$typeof: Symbol.for('react.element'),
      },
      createElement,
      createElement,
    ],
    $$typeof: Symbol.for('react.element'),
  }

  return createFragment
}

export default App()
