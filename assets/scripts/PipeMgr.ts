import { _decorator, Component, instantiate, Node, Prefab, Rect, UITransform } from 'cc'
import { GlobalData } from './GlobalData'
import { Pipe } from './Pipe'
import { Bird } from './Bird'
const { ccclass, property } = _decorator

const fisrtGap = 350
const pipePadding = 450
const pipeWidth = 120

@ccclass('PipeMgr')
export class PipeMgr extends Component {
  @property({
    type: Prefab,
    displayName: 'pipePrefab',
  })
  private pipePrefab: Prefab = null

  private pipeList: Pipe[] = []

  start() {}

  update(deltaTime: number) {
    if (GlobalData.isStart) {
      const firstPipe = this.pipeList[0]
      if (firstPipe) {
        // 如果第一个管道的位置小于屏幕左边界，那么就删除第一个管道
        // @ts-ignore
        if (firstPipe.node.position.x + pipeWidth / 2 < -this.node.parent.width / 2) {
          this.pipeList.shift()
          this.pipeList.push(firstPipe)

          // 重新设置位置
          const newX = this.pipeList[this.pipeList.length - 2].node.position.x + pipePadding
          firstPipe.node.setPosition(newX, firstPipe.node.position.y, 0)
          firstPipe.setRandomY()
        }
      }
    }
  }

  // 生成管道
  generatePipe() {
    // 获取屏幕宽度
    // @ts-ignore
    const screenWidth = this.node.parent.width
    const pipeCount = Math.ceil(screenWidth / pipePadding) + 1
    for (let i = 0; i < pipeCount; i++) {
      const pipe = instantiate(this.pipePrefab)
      pipe.setPosition(i * pipePadding + fisrtGap, 0, 0)
      this.node.addChild(pipe)
      const pipeComponent = pipe.getComponent(Pipe)
      pipeComponent.setRandomY()
      this.pipeList.push(pipeComponent)
    }
  }

  collisionCheck(bird: any) {
    for (let i = 0; i < this.pipeList.length; i++) {
      const pipe = this.pipeList[i]
      if (pipe.collisionCheck(bird)) {
        return true
      }
    }
    return false
  }

  reset() {
    this.pipeList = []
    this.node.removeAllChildren()
  }
}
