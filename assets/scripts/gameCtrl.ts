import { _decorator, Component, Node } from 'cc'
import { Ground } from './Ground'
import { Bird } from './Bird'
import { StartScreen } from './StartScreen'
import { EndScreen } from './EndScreen'
import { UIClass, UIMgr } from './lib/UIMgr'
import { PipeMgr } from './PipeMgr'
import { GlobalData } from './GlobalData'
const { ccclass, property } = _decorator

enum EFailType {
  PIPE,
  GROUND,
}

@ccclass('GameCtrl')
export class GameCtrl extends Component {
  @property({
    type: StartScreen,
    displayName: 'startScreen',
  })
  private startScreen: StartScreen = null

  @property({
    type: Ground,
    displayName: 'ground',
  })
  private ground: Ground = null

  @property({
    type: Bird,
    displayName: 'bird',
  })
  private bird: Bird = null

  @property({
    type: PipeMgr,
    displayName: 'pipeMgr',
  })
  private pipeMgr: PipeMgr = null

  start() {
    this.bindEvents()
  }

  update(deltaTime: number) {
    if (GlobalData.isStart) {
      // 如果鸟的位置小于地面的位置，那么游戏结束
      if (this.bird.bottomY < this.ground.node.position.y) {
        this.bird.setBottomY(this.ground.node.position.y)
        this.handleFail(EFailType.GROUND)
      }
    }
  }

  handleStart() {
    console.log('handleStart')
    GlobalData.isStart = true
    this.startScreen.hide()
  }

  handleFail(failType: EFailType) {
    console.log('handleFail')
    GlobalData.isStart = false
    UIMgr.instance.open(EndScreen as any, {
      onRestart: () => {
        this.resetGame()
      },
    })
  }

  resetGame() {
    this.startScreen.show()
    this.bird.resetBird()
  }

  bindEvents() {
    // 点击
    this.node.on(Node.EventType.TOUCH_START, () => {
      if (GlobalData.isStart) {
        this.bird.flyUp()
      }
    })
  }
}
