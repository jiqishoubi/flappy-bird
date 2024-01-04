import { _decorator, Component, Node } from 'cc'
const { ccclass, property } = _decorator

@ccclass('EndScreen')
export class EndScreen extends Component {
  private onRestart: () => void = null

  start() {
    this.node.active = false
  }

  update(deltaTime: number) {}

  show(params: { onRestart: () => void }) {
    this.node.active = true
    if (params?.onRestart) {
      this.onRestart = params.onRestart
    }
  }

  hide() {
    this.node.active = false
  }

  handleRestart() {
    this.hide()
    this.onRestart?.()
  }
}
