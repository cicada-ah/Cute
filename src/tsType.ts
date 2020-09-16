export interface VNode {
  type: string | symbol | any
  key: any
  props?: any
  children?: VNode[] | string
  el?: HTMLElement | Text
  $$typeof?: symbol
  [propsname: string]: any
}

export interface vElement extends HTMLElement {
  vnode?: VNode
}
