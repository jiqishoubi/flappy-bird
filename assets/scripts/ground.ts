import { _decorator, Component, Node } from 'cc'
const { ccclass, property } = _decorator

@ccclass('ground')
export class ground extends Component {
  start() {
    console.log('🚀 ~ ground start')
  }

  update(deltaTime: number) {}

  scroll() {
    const start = -380
    const rawWidth = 336
    let newX = this.node.position.x - 2
    if (newX < start - rawWidth) {
      newX = newX + rawWidth
    }
    this.node.setPosition(newX, this.node.position.y, this.node.position.z)
  }
}
