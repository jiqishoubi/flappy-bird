import { _decorator, Component, Node } from 'cc'
import { Ground } from './Ground'
import { Bird } from './Bird'
import { StartScreen } from './StartScreen'
import { EndScreen } from './EndScreen'
import { UIClass, UIMgr } from './lib/UIMgr'
import { PipeMgr } from './PipeMgr'
import { AudioData, GlobalData } from './GlobalData'
import { AudioMgr } from './AudioMgr'
const { ccclass, property } = _decorator

enum EFailType {
  PIPE,
  GROUND,
}

@ccclass('GameCtrl')
export class GameCtrl extends Component {
  private static _instance: GameCtrl = null

  public static get instance() {
    return GameCtrl._instance
  }

  @property({
    type: StartScreen,
    displayName: 'startScreen',
  })
  startScreen: StartScreen = null

  @property({
    type: Ground,
    displayName: 'ground',
  })
  ground: Ground = null

  @property({
    type: Bird,
    displayName: 'bird',
  })
  bird: Bird = null

  @property({
    type: PipeMgr,
    displayName: 'pipeMgr',
  })
  pipeMgr: PipeMgr = null

  start() {
    GameCtrl._instance = this
    this.bindEvents()
  }

  update(deltaTime: number) {
    if (GlobalData.isStart) {
      if (this.pipeMgr.collisionCheck(this.bird)) {
        this.handleFail(EFailType.PIPE)
      }
      if (this.ground.collisionCheck(this.bird)) {
        this.handleFail(EFailType.GROUND)
      }
    }
  }

  handleStart() {
    console.log('handleStart')
    GlobalData.isStart = true
    this.startScreen.hide()
    this.pipeMgr.generatePipe()
  }

  handleFail(failType: EFailType) {
    console.log('handleFail')
    GlobalData.isStart = false
    AudioMgr.instance.playOneShot(AudioData.hit)
    UIMgr.instance.open(EndScreen as any, {
      onRestart: () => {
        this.resetGame()
      },
    })
  }

  resetGame() {
    this.startScreen.show()
    this.bird.reset()
    this.pipeMgr.reset()
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
