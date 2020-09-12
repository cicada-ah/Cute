import webRender from '@/webRender'
import { vElement } from '@/tsType'

class CuteComponent {
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
  // 负值后，调用实例属性render重渲染
  webRender(this.render(), this.$el)
}

// 模拟react.component.proptype
CuteComponent.prototype._isClassComponent = true
export default CuteComponent
