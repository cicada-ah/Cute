import webRender from './webRender'
import App from './App'
// ReactDOM.rander(...)
webRender(App, document.getElementById('app'))

// // 更新标签演示
// const v1 = {
//   type: 'div',
//   key: null,
//   props: {
//     style: {
//       height: '66px',
//       color: 'red',
//       fontSize: '25px',
//       background: '#ddd',
//     },
//   },
//   children: [
//     {
//       type: 'p',
//       key: '1',
//       props: null,
//       children: [
//         {
//           type: null,
//           key: null,
//           props: null,
//           children: `'ChildComp' count->|${'red'}`,
//           $$typeof: Symbol.for('react.element'),
//         },
//       ],
//       $$typeof: Symbol.for('react.element'),
//     },
//     {
//       type: 'p',
//       key: null,
//       props: null,
//       children: [
//         {
//           type: 'span',
//           key: null,
//           props: null,
//           children: [
//             {
//               type: null,
//               key: null,
//               props: null,
//               children: `'ChildComp' count->|${'red'}`,
//               $$typeof: Symbol.for('react.element'),
//             },
//           ],
//           $$typeof: Symbol.for('react.element'),
//         },
//       ],
//       $$typeof: Symbol.for('react.element'),
//     },
//   ],
//   $$typeof: Symbol.for('react.element'),
// }
// const v2 = {
//   type: 'div',
//   key: null,
//   props: {
//     style: {
//       height: '66px',
//       color: 'green',
//       fontSize: '25px',
//       background: '#ddd',
//     },
//   },
//   children: [
//     {
//       type: 'p',
//       key: null,
//       props: null,
//       children: [
//         {
//           type: null,
//           key: null,
//           props: null,
//           children: `'ChildComp' count->|${'green'}`,
//           $$typeof: Symbol.for('react.element'),
//         },
//       ],
//       $$typeof: Symbol.for('react.element'),
//     },
//     {
//       type: 'p',
//       key: '1',
//       props: null,
//       children: [
//         {
//           type: 'span',
//           key: null,
//           props: null,
//           children: [
//             {
//               type: null,
//               key: null,
//               props: null,
//               children: `'ChildComp' count->|${'green'}`,
//               $$typeof: Symbol.for('react.element'),
//             },
//           ],
//           $$typeof: Symbol.for('react.element'),
//         },
//       ],
//       $$typeof: Symbol.for('react.element'),
//     },
//   ],
//   $$typeof: Symbol.for('react.element'),
// }

// webRender(v1, document.getElementById('app'))

// setTimeout(() => {
//   webRender(v2, document.getElementById('app'))
// }, 3000)
