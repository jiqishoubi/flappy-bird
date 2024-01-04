import { _decorator, Component, Node } from 'cc'
import { UIClass } from './lib/UIMgr'
const { ccclass, property } = _decorator

@ccclass('EndScreen')
export class EndScreen extends UIClass {
  static readonly bundleName = 'prefabBundle'
  static readonly prefabPath = 'endScreen'
  static readonly scriptName = 'EndScreen'

  private payload: {
    onRestart: () => void
  }

  start() {}

  update(deltaTime: number) {}

  open = (payload) => {
    this.node.active = true
    this.payload = payload
  }

  close = () => {
    this.node.active = false
  }

  handleRestart() {
    this.close()
    this.payload?.onRestart()
  }
}
