export interface VNode {
  type: string | symbol | any
  props?: any
  children?: VNode[] | string
  el?: HTMLElement | Text
  $$typeof?: symbol
}

export interface vElement extends HTMLElement {
  vnode?: VNode
}
