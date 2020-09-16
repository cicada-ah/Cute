import { vElement } from '@/tsType'

class CuteComponent {
  [x: string]: any
  _isClassComponent: boolean
  setState: (partialState: any) => void
  state: any
  render: any
  $el: vElement
  constructor(props: any) {}
}

// 模拟 setstate
CuteComponent.prototype.setState = function (partialState) {
  // this 实例，给属性state负值
  this.state = partialState
  // 负值后，调用实例属性_renderComponent重渲染
  this._renderComponent()
}

// 模拟react.component.proptype
CuteComponent.prototype._isClassComponent = true
export default CuteComponent
