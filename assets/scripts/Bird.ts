import { _decorator, Component, Node } from 'cc'
import { GlobalData } from './GlobalData'
const { ccclass, property } = _decorator

const birdDefaultPosition = [0, 50, 0]

@ccclass('Bird')
export class Bird extends Component {
  // 重力
  private gravity = -9.8 * 180
  private vy = 0 // 初速度

  start() {}

  update(deltaTime: number) {
    if (GlobalData.isStart) {
      // 下落
      this.vy = this.vy + this.gravity * deltaTime
      const dy = this.vy * deltaTime
      const newY = this.node.position.y + dy
      this.node.setPosition(this.node.position.x, newY, this.node.position.z)
    }
  }

  get bottomY() {
    // @ts-ignore
    return this.node.position.y - this.node.height / 2
  }

  setBottomY(y: number) {
    // @ts-ignore
    this.node.setPosition(this.node.position.x, y + this.node.height / 2, this.node.position.z)
  }

  resetBird() {
    this.vy = 0
    // @ts-ignore
    this.node.setPosition(...birdDefaultPosition)
  }

  flyUp() {
    this.vy = 700
  }
}
