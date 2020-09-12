class CuteComponent {
  _isClassComponent: boolean
  constructor(props: any) {}
}
// 模拟react.component.proptype
CuteComponent.prototype._isClassComponent = true
export default CuteComponent
