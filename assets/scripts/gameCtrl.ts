import { _decorator, Component, Node } from 'cc'
import { Ground } from './Ground'
import { Bird } from './Bird'
import { StartScreen } from './StartScreen'
import { EndScreen } from './EndScreen'
import { UIClass, UIMgr } from './lib/UIMgr'
const { ccclass, property } = _decorator

enum EFailType {
  PIPE,
  GROUND,
}

@ccclass('GameCtrl')
export class GameCtrl extends Component {
  private isGameOver = false

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

  start() {
    this.bindEvents()
  }

  update(deltaTime: number) {
    if (!this.isGameOver) {
      // 如果鸟的位置小于地面的位置，那么游戏结束
      if (this.bird.bottomY < this.ground.node.position.y) {
        this.bird.setBottomY(this.ground.node.position.y)
        this.handleFail(EFailType.GROUND)
      }
    }
  }

  handleStart() {
    console.log('handleStart')
    this.isGameOver = false
    this.startScreen.hide()
    this.ground.startScroll()
    this.bird.startGame()
  }

  handleFail(failType: EFailType) {
    console.log('handleFail')
    this.isGameOver = true
    this.ground.stopScroll()
    this.bird.stopGame()
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

  bindEvents(){
    // 点击
    this.node.on(Node.EventType.TOUCH_START, () => {
      if (!this.isGameOver) {
        this.bird.flyUp()
      }
    })
  }
}
