import { mount } from './webRender'
import { VNode, vElement } from './tsType'

// 挂载标签
const mountLabel = (newNode: VNode, container: vElement): void => {
  // 创建
  const el = document.createElement(newNode.type as string)
  const { entries } = Object
  const { attr, children } = newNode
  if (attr) {
    for (const prop in attr) {
      switch (prop) {
        case 'style':
          for (const [key, value] of entries(attr[prop])) {
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

// 挂载组件
const mountComponent = (newNode: VNode, container: vElement): void => {}

// 挂载Portal
const mountPortal = (newNode: VNode, container: vElement): void => {}

// 挂载fragment
const mountFragment = (newNode: VNode, container: vElement): void => {
  // 没有el，把父节点传入mount
  const { children } = newNode
  if (children) {
    Array.prototype.forEach.call(children, item => {
      mount(item, container)
    })
  }
}

export { mountLabel, mountText, mountComponent, mountPortal, mountFragment }
