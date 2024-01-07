import { _decorator, Component, Node, Sprite } from 'cc'
import { GlobalData } from './GlobalData'
import { scrollSpeed } from './utils'
import { GameCtrl } from './GameCtrl'
import { Ground } from './Ground'
const { ccclass, property } = _decorator

const pipeGap = 200

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

  setRandomY() {
    const _minY = GameCtrl.instance.ground.node.position.y
    // @ts-ignore
    const _maxY = GameCtrl.instance.node.height / 2 - 140
    const _gap = pipeGap / 2 + 50

    const minY = _minY + _gap
    const maxY = _maxY - _gap

    const randomY = minY + Math.random() * (maxY - minY)
    this.node.setPosition(this.node.position.x, randomY, this.node.position.z)
  }
}
