import { _decorator, Component, Node } from 'cc'
const { ccclass, property } = _decorator

@ccclass('Bird')
export class Bird extends Component {
  private isStart = false
  // 重力
  private gravity = -9.8 * 80
  private vy = 0 // 初速度

  start() {}

  update(deltaTime: number) {
    if (this.isStart) {
      // 下落
      this.vy = this.vy + this.gravity * deltaTime
      const dy = this.vy * deltaTime
      const newY = this.node.position.y + dy
      this.node.setPosition(this.node.position.x, newY, this.node.position.z)
    }
  }

  startGame() {
    this.isStart = true
  }

  stopGame() {
    this.isStart = false
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
    this.node.setPosition(0, 0, 0)
  }
}
