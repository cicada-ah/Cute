import { VNode, vElement } from './tsType'
import { _hook } from './components/mocHook'
import { patch } from './patch'
// 挂载函数
export function mount(newNode: VNode, container: vElement): void {
  const { type } = newNode
  if (typeof type === 'string') {
    // 挂载普通标签
    mountLabel(newNode, container)
  } else if (typeof type === 'function') {
    // 挂载组件
    mountComponent(newNode, container)
  } else if (type === null) {
    // 挂载文本
    mountText(newNode, container)
  } else if (type === Symbol.for('react.portal')) {
    // 挂载portal
    mountPortal(newNode)
  } else if (type === Symbol.for('react.fragment')) {
    // 挂载fragment
    mountFragment(newNode, container)
  }
}
// 挂载标签
const mountLabel = (newNode: VNode, container: vElement): void => {
  // 创建
  const el = document.createElement(newNode.type as string)
  const { entries } = Object
  const { props, children } = newNode
  if (props) {
    for (const prop in props) {
      switch (prop) {
        case 'style':
          for (const [key, value] of entries(props[prop])) {
            el.style[key] = value
          }
      }
    }
  }
  if (children) {
    Array.prototype.forEach.call(children, item => {
      mount(item, el)
    })
  }
  // 把真实dom绑定在vnode上
  newNode.el = el
  // 添加
  container.appendChild(el)
}

// 挂载文本
const mountText = (newNode: VNode, container: vElement): void => {
  const el = document.createTextNode(newNode.children as string)
  newNode.el = el
  container.appendChild(el)
}

// 挂载组件（待修改）
const mountComponent = (newNode: VNode, container: vElement): void => {
  if (newNode.type.prototype && newNode.type.prototype._isClassComponent) {
    // class组件
    mountClassComp(newNode, container)
  } else {
    mountFuncComp(newNode, container)
  }
}

// 挂载class组件
const mountClassComp = (newNode: VNode, container: vElement): void => {
  // 创建实例
  const instance = new newNode.type()
  // 为了在patch拿到instacne，来触发更新，再这把instance绑定到newNode上
  newNode._instance = instance
  // instance绑定_renderComponent
  instance._renderComponent = () => {
    // 挂载了，就执行patch的逻辑
    if (instance._ismounted) {
      const newNode = instance.render()
      const oldNode = instance.vnode
      patch(newNode, oldNode, oldNode.el.parentNode)
      // 让newNode成为下一次的旧节点
      instance.vnode = newNode
      instance._el = newNode.el
    } else {
      // 调用render
      const vnode = instance.render()
      // 挂载vnode
      mount(vnode, container)
      // 组件没有真实el，但是vnode进去mount一定会被绑定
      newNode.el = vnode.el
      // 给实例挂载上el
      instance._el = vnode.el
      // 给vnode赋值，后续patch需要
      instance.vnode = vnode
      instance._ismounted = true
    }
  }
  // 第一次正常挂载
  instance._renderComponent()
}

// 挂载函数组件
const mountFuncComp = (newNode: VNode, container: vElement): void => {
  // 调用函数获取vnode
  const vnode = newNode.type()
  // 挂载vnode
  mount(vnode, container)
  // 组件没有真实el，但是vnode进去mount一定会被绑定
  newNode.el = vnode.el
  // 是hook函数
  if (_hook._isHookFun) {
    _hook.container = container
  }
}

// 挂载Portal
const mountPortal = (newNode: VNode): void => {
  const { props, children } = newNode
  //  根据想挂载元素的id
  const portalElement = document.querySelector(props.position)
  if (portalElement) {
    Array.prototype.forEach.call(children, item => {
      mount(item, portalElement)
    })
  }
  // 取到第一个子节点，方便后续移除更新
  newNode.el = (children[0] as VNode).el
}

// 挂载fragment
const mountFragment = (newNode: VNode, container: vElement): void => {
  // 没有el，把父节点传入mount
  const { children } = newNode
  if (children) {
    Array.prototype.forEach.call(children, item => {
      mount(item, container)
    })
  }
  // 取到第一个子节点，方便后续移除更新
  newNode.el = (children[0] as VNode).el
}

export { mountLabel, mountText, mountComponent, mountPortal, mountFragment }
