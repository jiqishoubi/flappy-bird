import { _decorator, Component, Label, Node } from 'cc'
import { UIClass } from './lib/UIMgr'
import { GlobalData } from './GlobalData'
const { ccclass, property } = _decorator

interface IPayload {
  onRestart: () => void
}

@ccclass('EndScreen')
export class EndScreen extends UIClass {
  static readonly bundleName = 'prefabBundle'
  static readonly prefabPath = 'endScreen'
  static readonly scriptName = 'EndScreen'

  private payload: IPayload

  @property({
    type: Node,
    displayName: 'score',
  })
  private score: Node = null

  start() {}

  update(deltaTime: number) {}

  open = (payload: IPayload) => {
    this.node.active = true
    this.payload = payload
    this.score.getComponent(Label).string = '得分: ' + GlobalData.score
  }

  close = () => {
    this.node.active = false
  }

  handleRestart() {
    this.close()
    this.payload?.onRestart()
  }
}
