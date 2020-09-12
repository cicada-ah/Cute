import CuteComponent from './cuteComponent'
import { VNode } from '@/tsType'

class ChildClass extends CuteComponent {
  constructor(props: any) {
    super(props)
  }
  render = (): VNode => {
    return {
      type: 'marquee',
      props: {
        style: {
          height: '66px',
          color: '#fff',
          background: '#ddd',
        },
      },
      children: [
        {
          type: null,
          props: null,
          children: 'ChildComp',
          $$typeof: Symbol.for('react.element'),
        },
      ],
      $$typeof: Symbol.for('react.element'),
    }
  }
}

export default ChildClass
