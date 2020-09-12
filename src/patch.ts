import { VNode, vElement } from './tsType'
import { mount } from './mount'
// 补丁函数
export function patch(
  newNode: VNode,
  oldNode: VNode,
  container: vElement
): void {
  const newNodeType: any = newNode.type
  const oldNodeType: any = oldNode.type
  switch (newNodeType) {
    case newNodeType !== oldNodeType:
      // 节点类型不同调用
      patchElement(newNode, oldNode, container)
      break
    case typeof newNodeType === 'string':
      patchLabel(newNode, oldNode, container)
      break
    case typeof newNodeType === 'function':
      patchComponent(newNode, oldNode, container)
      break
    case typeof newNodeType === null:
      patchText(newNode, oldNode, container)
      break
    case newNodeType === Symbol.for('react.portal'):
      patchPortal(newNode, oldNode, container)
      break
    case newNodeType === Symbol.for('react.fragment'):
      patchFragment(newNode, oldNode, container)
      break
    default:
      break
  }
}

// patchElement
const patchElement = (newNode: VNode, oldNode: VNode, container: vElement) => {
  // 移除旧节点，mount新节点
  container.removeChild(oldNode.el)
  mount(newNode, container)
  // 更新container上的vnode
  container.vnode = newNode
}
