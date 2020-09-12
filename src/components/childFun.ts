const ChildFun = (): any => {
  const createElement = {
    type: 'marquee',
    props: {
      style: {
        height: '66px',
        color: '#fff',
        background: '#ccc',
      },
    },
    children: [
      {
        type: null,
        props: null,
        children: 'ChildFun',
        $$typeof: Symbol.for('react.element'),
      },
    ],
    $$typeof: Symbol.for('react.element'),
  }
  return createElement
}

export default ChildFun
