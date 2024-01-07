import { _decorator, Component, Node, Rect, UITransform } from 'cc'
import { GlobalData } from './GlobalData'
import { scrollSpeed } from './utils'
import { Bird } from './Bird'
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

  collisionCheck(bird: Bird) {
    // 如果鸟的位置小于地面的位置，那么游戏结束
    if (bird.bottomY < this.node.position.y) {
      bird.setBottomY(this.node.position.y)
      return true
    }
    return false
  }
}
