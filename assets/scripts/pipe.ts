import { _decorator, Component, Node, Sprite } from 'cc'
import { GlobalData } from './GlobalData'
import { scrollSpeed } from './utils'
const { ccclass, property } = _decorator

@ccclass('Pipe')
export class Pipe extends Component {
  @property({
    type: Sprite,
    displayName: 'topPipe',
  })
  private topPipe: Sprite = null

  @property({
    type: Sprite,
    displayName: 'bottomPipe',
  })
  private bottomPipe: Sprite = null

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
