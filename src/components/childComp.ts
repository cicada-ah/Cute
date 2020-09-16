import CuteComponent from './cuteComponent'
import { VNode } from '@/tsType'

class ChildClass extends CuteComponent {
  state: { count: number }
  constructor(props: any) {
    super(props)
    this.state = { count: 1 }
  }

  render = (): VNode => {
    this.state.count === 1 &&
      setTimeout(() => {
        this.setState({ count: 2 })
      }, 3000)
    return {
      type: 'div',
      key: null,
      props: {
        style: {
          height: '66px',
          color: 'red',
          fontSize: '25px',
          background: '#ddd',
        },
      },
      children: [
        {
          type: null,
          key: null,
          props: null,
          children: `'ChildComp' count->|${this.state.count}`,
          $$typeof: Symbol.for('react.element'),
        },
      ],
      $$typeof: Symbol.for('react.element'),
    }
  }
}

export default ChildClass
