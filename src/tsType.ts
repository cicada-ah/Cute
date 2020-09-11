export interface VNode {
  type: string | symbol
  attr?: any
  children?: VNode[] | string
  el?: HTMLElement | Text
  $$typeof?: symbol
}

export interface vElement extends HTMLElement {
  vnode?: VNode
}
