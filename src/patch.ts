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
  if (newNodeType !== oldNodeType) {
    // 节点类型不同调用
    patchElement(newNode, oldNode, container)
  } else if (typeof newNodeType === 'string') {
    patchLabel(newNode, oldNode, container)
  } else if (typeof newNodeType === 'function') {
    patchComponent(newNode, oldNode, container)
  } else if (newNodeType === null) {
    patchText(newNode, oldNode, container)
  } else if (newNodeType === Symbol.for('react.portal')) {
    // patchPortal(newNode, oldNode, container)
  } else if (newNodeType === Symbol.for('react.fragment')) {
    // patchFragment(newNode, oldNode, container)
  }
}

// patchElement
const patchElement = (newNode: VNode, oldNode: VNode, container: vElement) => {
  // 移除旧节点，mount新节点
  container.removeChild(oldNode.el)
  mount(newNode, container)
}

// patchLabel
const patchLabel = (newNode: VNode, oldNode: VNode, container: vElement) => {
  // key不同移除旧节点，mount新节点
  if (newNode.key && newNode.key !== oldNode.key) {
    patchElement(newNode, oldNode, container)
  }
  // newNode要引用oldNode的el
  // el的获取要通过oldNode上引用的
  const el = (newNode.el = oldNode.el as HTMLElement)

  const { entries, keys } = Object
  const { props: newProps, children: newChildren } = newNode
  const { props: oldProps, children: oldChildren } = oldNode
  // props
  if (newProps) {
    for (const prop of keys(newProps)) {
      switch (prop) {
        case 'style':
          // 更新新style
          for (const [key, value] of entries(newProps[prop])) {
            el.style[key] = value
          }
          // 移除新style没有的
          for (const [key] of keys(oldProps[prop])) {
            if (!Object.prototype.hasOwnProperty.call(newProps[prop], key)) {
              el.style[key] = ''
            }
          }
      }
    }
  } else if (oldProps) {
    // 如果没有新的，就全移除
    for (const prop of oldProps) {
      switch (prop) {
        case 'style':
          // 移除旧style
          for (const [key] of entries(oldProps[prop])) {
            el.style[key] = ''
          }
      }
    }
  }

  // children
  if (!oldChildren) {
    if (!newChildren) {
      // 都为null没有操作
      console.log('done')
    } else {
      // 把新节点从新挂载, el扮演着container的作用
      for (let i = 0; i < newChildren.length; i++) {
        mount(newChildren[i] as VNode, el)
      }
    }
  } else {
    if (!newChildren) {
      // 旧节点不空，新节点空，全移除
      for (let i = 0; i < newChildren.length; i++) {
        el.removeChild((newChildren[i] as VNode).el)
      }
    } else {
      // // 移除旧的
      // for (let i = 0; i < oldChildren.length; i++) {
      //   container.removeChild((oldChildren[i] as VNode).el)
      // }
      // // 添加新的
      // for (let i = 0; i < newChildren.length; i++) {
      //   mount(newChildren[i] as VNode, container)
      // }
      // 要得到新旧谁更长，共同部分patch，剩余部分mount或remove处理
      // const newLen = newChildren.length,
      //   oldLen = oldChildren.length,
      //   commonLen = newLen > oldLen ? oldLen : newLen
      // // 共有部分通过patch保证复用
      // for (let i = 0; i < commonLen; i++) {
      //   patch(newChildren[i] as VNode, oldChildren[i] as VNode, el)
      // }
      // // mount新节点多出的
      // if (newLen > commonLen) {
      //   for (let i = commonLen; i < newLen; i++) {
      //     mount(newChildren[i] as VNode, el)
      //   }
      // }
      // // 移除旧子节点多出的
      // if (oldLen > commonLen) {
      //   for (let i = commonLen; i < oldLen; i++) {
      //     el.removeChild((oldChildren[i] as VNode).el)
      //   }
      // }

      // 存储前一个新节点，方便移动真实元素
      let pervNewChildren = null
      for (let i = 0; i < newChildren.length; i++) {
        if (i > 0) {
          pervNewChildren = newChildren[i - 1]
        }
        // 新节点无key
        if ((newChildren[i] as VNode).key === null) {
          // 旧节点没有当前的index索引
          if (!oldChildren[i]) {
            mount(newChildren[i] as VNode, el)
          } else {
            // 旧节点有当前索引，且key也为null，那就patch
            if ((oldChildren[i] as VNode).key === null) {
              patch(newChildren[i] as VNode, oldChildren[i] as VNode, el)
              // 动态添加'isUse',标记旧节点已用~
              oldChildren[i]['isUse'] = true
            } else {
              // 旧节点key存在，那新节点自己想办法创建吧
              mount(newChildren[i] as VNode, el)
            }
          }
        } else {
          let isFind = false
          // 新节点有key 遍历旧节点
          for (let j = 0; j < oldChildren.length; j++) {
            // 旧节点key不为null，且等于新节点
            if (
              (oldChildren[j] as VNode).key &&
              (newChildren[i] as VNode).key === (oldChildren[j] as VNode).key
            ) {
              // 标记找到了，就不用mount
              isFind = true
              // 移动el元素到当前newChidren的位置
              if (pervNewChildren === null) {
                // 第一个元素，移动到第一个位置
                el.insertAdjacentElement(
                  'afterbegin',
                  (oldChildren[j] as VNode).el as Element
                )
              } else {
                // 上一个子元素的el后
                pervNewChildren.el.insertAdjacentElement(
                  'afterend',
                  (oldChildren[j] as VNode).el as Element
                )
              }
              patch(newChildren[i] as VNode, oldChildren[j] as VNode, el)
              // 动态添加'isUse',标记旧节点已用~
              oldChildren[j]['isUse'] = true
              break
            }
          }
          // 遍历完没找到key相同的，mount新节点
          if (!isFind) {
            mount(newChildren[i] as VNode, el)
          }
        }
      }
      // 移除没有使用的旧节点
      for (let j = 0; j < oldChildren.length; j++) {
        // 没有使用的
        if (!oldChildren[j]['isUse']) {
          console.log(oldChildren[j], j, oldChildren[j]['isUse'])
          el.removeChild((oldChildren[j] as VNode).el)
        }
      }
    }
  }
}

// patchText
const patchText = (newNode: VNode, oldNode: VNode, container: vElement) => {
  const el = (newNode.el = oldNode.el)
  if (newNode.children !== oldNode.children) {
    el.nodeValue = newNode.children as string
  }
}

// patchComponent
const patchComponent = (
  newNode: VNode,
  oldNode: VNode,
  container: vElement
) => {
  if (newNode.type.prototype && newNode.type.prototype._isClassComponent) {
    // class组件
    patchClassComp(newNode, oldNode, container)
  } else {
    // patchFuncComp(newNode, oldNode, container)
  }
}
// patchClassComp
const patchClassComp = (
  newNode: VNode,
  oldNode: VNode,
  container: vElement
) => {}
