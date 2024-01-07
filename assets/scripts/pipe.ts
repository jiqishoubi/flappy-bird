import { _decorator, Component, Node, Rect, Sprite, UITransform } from 'cc'
import { GlobalData } from './GlobalData'
import { scrollSpeed } from './utils'
import { GameCtrl } from './GameCtrl'
import { Ground } from './Ground'
const { ccclass, property } = _decorator

const pipeGap = 220

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

  collisionCheck(bird: any) {
    const birdPositionInThisNode = this.node.getComponent(UITransform).convertToNodeSpaceAR(bird.node.worldPosition)
    // Rect 的 x, y 是左下角的坐标
    const birdRect = new Rect(
      birdPositionInThisNode.x - bird.node.width / 2,
      birdPositionInThisNode.y - bird.node.height / 2,
      bird.node.width,
      bird.node.height
    )

    // 上管道
    const topPipePositionInThisNode = this.node.getComponent(UITransform).convertToNodeSpaceAR(this.topPipe.node.worldPosition)
    const topPipeRect = new Rect(
      topPipePositionInThisNode.x - this.topPipe.node.width / 2,
      topPipePositionInThisNode.y,
      this.topPipe.node.width,
      this.topPipe.node.height
    )
    if (topPipeRect.intersects(birdRect)) {
      return true
    }

    // 下管道
    const bottomPipePositionInThisNode = this.node.getComponent(UITransform).convertToNodeSpaceAR(this.bottomPipe.node.worldPosition)
    const bottomPipeRect = new Rect(
      bottomPipePositionInThisNode.x - this.bottomPipe.node.width / 2,
      bottomPipePositionInThisNode.y - this.bottomPipe.node.height,
      this.bottomPipe.node.width,
      this.bottomPipe.node.height
    )
    if (bottomPipeRect.intersects(birdRect)) {
      return true
    }

    return false
  }
}
