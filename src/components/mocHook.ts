import webRender from '@/webRender'

const _hook = {
  _isHookFun: false,
  state: null,
  container: null,
}

const setState = update => {
  _hook.state = update
  const oldNode = _hook.container.vnode
  webRender(oldNode, _hook.container)
}

const useState = (inf: any): any[] => {
  _hook.state = _hook.state || inf
  _hook._isHookFun = true
  return [_hook.state, setState]
}

export { useState, _hook }
