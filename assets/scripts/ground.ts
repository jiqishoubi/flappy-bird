import { _decorator, Component, Node } from 'cc'
import { GlobalData } from './GlobalData'
import { scrollSpeed } from './utils'
const { ccclass, property } = _decorator

@ccclass('Ground')
export class Ground extends Component {
  start() {}

  update(deltaTime: number) {
    if (GlobalData.isStart) {
      this.scroll()
    }
  }

  scroll() {
    const start = -380
    const rawWidth = 336
    let newX = this.node.position.x - scrollSpeed
    if (newX < start - rawWidth) {
      newX = newX + rawWidth
    }
    this.node.setPosition(newX, this.node.position.y, this.node.position.z)
  }
}
