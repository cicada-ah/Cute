// import ChildFun from './components/childFun'
import ChildClass from './components/childComp'
import ChildFun from './components/childFun'

// 模拟组件返回vnode
const App = () => {
  // 普通标签 vnode
  // const createElement = {
  //   type: 'marquee',
  //   props: {
  //     style: {
  //       height: '66px',
  //       color: '#fff',
  //       background: 'blue',
  //     },
  //   },
  //   children: [
  //     {
  //       type: null,
  //       props: null,
  //       children: 'hi',
  //       $$typeof: Symbol.for('react.element'),
  //     },
  //   ],
  //   $$typeof: Symbol.for('react.element'),
  // }

  // fragment vnode
  // const createFragment = {
  //   type: Symbol.for('react.fragment'),
  //   props: null,
  //   children: [
  //     {
  //       type: 'p',
  //       props: {
  //         style: {
  //           height: '66px',
  //           textAlign: 'center',
  //           color: '#fff',
  //           background: 'green',
  //         },
  //       },
  //       children: [{ type: null, props: null, children: 'fragment' }],
  //       $$typeof: Symbol.for('react.element'),
  //     },
  //     createElement,
  //     createElement,
  //   ],
  //   $$typeof: Symbol.for('react.element'),
  // }

  // 任意门还就那个起飞✈
  // const createPortal = {
  //   type: Symbol.for('react.portal'),
  //   props: {
  //     position: '#portal',
  //   },
  //   children: [
  //     {
  //       type: 'p',
  //       props: {
  //         style: {
  //           height: '66px',
  //           textAlign: 'center',
  //           color: '#fff',
  //           background: 'orange',
  //         },
  //       },
  //       children: [{ type: null, props: null, children: 'portal' }],
  //       $$typeof: Symbol.for('react.element'),
  //     },
  //     createFragment,
  //   ],
  //   $$typeof: Symbol.for('react.element'),
  // }

  // 函数组件
  const createFuncComp = {
    type: ChildFun,
    props: null,
    children: null,
    $$typeof: Symbol.for('react.element'),
  }

  // class组件
  // const createClassComp = {
  //   type: ChildClass,
  //   props: null,
  //   children: null,
  //   $$typeof: Symbol.for('react.element'),
  // }
  return createFuncComp
}

export default App()
