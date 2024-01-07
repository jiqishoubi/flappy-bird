import { _decorator, Component, instantiate, Node, Prefab } from 'cc'
import { GlobalData } from './GlobalData'
import { scrollSpeed } from './utils'
const { ccclass, property } = _decorator

const pipePadding = 400

@ccclass('PipeMgr')
export class PipeMgr extends Component {
  @property({
    type: Prefab,
    displayName: 'pipePrefab',
  })
  private pipePrefab: Prefab = null

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

  // 生成管道
  generatePipe() {
    const fisrtGap = 350
    // 获取屏幕宽度
    // @ts-ignore
    const screenWidth = this.node.parent.width
    const pipeCount = Math.ceil(screenWidth / pipePadding) + 1
    for (let i = 0; i < pipeCount; i++) {
      const pipe = instantiate(this.pipePrefab)
      pipe.setPosition(i * pipePadding + fisrtGap, 0, 0)
      this.node.addChild(pipe)
    }
  }
}
