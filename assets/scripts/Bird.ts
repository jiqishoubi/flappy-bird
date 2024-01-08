import { _decorator, Component, Node, Vec3 } from 'cc'
import { AudioData, GlobalData } from './GlobalData'
import { AudioMgr } from './AudioMgr'
const { ccclass, property } = _decorator

const birdDefaultPosition = [0, 50, 0]

@ccclass('Bird')
export class Bird extends Component {
  // 重力
  private gravity = -9.8 * 190
  private vy = 0 // 初速度

  start() {}

  update(deltaTime: number) {
    if (GlobalData.isStart) {
      this.fallDown(deltaTime)
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

  setVY(vy: number) {
    this.vy = vy
    // 控制鸟的旋转
    // 根据vy设置 rotation
    const angle = (Math.atan(vy / 550) * 120) / Math.PI
    if (vy > 0) {
      this.node.eulerAngles = new Vec3(0, 0, angle)
    } else if (vy === 0) {
      this.node.eulerAngles = new Vec3(0, 0, 0)
    } else {
      this.node.eulerAngles = new Vec3(0, 0, angle)
    }
  }

  reset() {
    this.setVY(0)
    // @ts-ignore
    this.node.setPosition(...birdDefaultPosition)
  }

  // 上升 跳跃
  flyUp() {
    this.setVY(550)
    AudioMgr.instance.playOneShot(AudioData.swoosh)
  }

  fallDown(deltaTime) {
    this.setVY(this.vy + this.gravity * deltaTime)
    const dy = this.vy * deltaTime
    const newY = this.node.position.y + dy
    this.node.setPosition(this.node.position.x, newY, this.node.position.z)
  }
}
