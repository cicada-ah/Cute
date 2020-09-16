import { useState } from './mocHook'

const ChildFun = (): any => {
  const [count, setCount] = useState('red')
  count === 'red' &&
    setTimeout(() => {
      setCount('green')
    }, 3000)
  const createElement = {
    type: 'div',
    props: {
      style: {
        height: '66px',
        color: count,
        fontSize: '25px',
        background: '#ddd',
      },
    },
    children: [
      {
        type: null,
        props: null,
        children: `'ChildComp' count->|${count}`,
        $$typeof: Symbol.for('react.element'),
      },
    ],
    $$typeof: Symbol.for('react.element'),
  }
  return createElement
}

export default ChildFun
