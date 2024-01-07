import { _decorator, Component, Node } from 'cc'
import { GlobalData } from './GlobalData'
import { scrollSpeed } from './utils'
const { ccclass, property } = _decorator

@ccclass('PipeMgr')
export class PipeMgr extends Component {
  start() {}

  update(deltaTime: number) {
    if (GlobalData.isStart) {
      this.scroll()
    }
  }

  scroll() {
    let newX = this.node.position.x - scrollSpeed
    this.node.setPosition(newX, this.node.position.y, this.node.position.z)
  }
}
