import { _decorator, Component, Node } from 'cc'
const { ccclass, property } = _decorator

enum EFailType {
  PIPE,
  GROUND,
}

@ccclass('gameCtrl')
export class gameCtrl extends Component {
  @property({
    type: Node,
    displayName: 'startScreen',
  })
  private startScreen: Node = null

  @property({
    type: Node,
    displayName: 'ground',
  })
  private ground: Node = null

  start() {}

  update(deltaTime: number) {}

  handleStart() {
    console.log('🚀 ~ gameCtrl ~ handleStart')
    this.startScreen.active = false
    this.ground.getComponent('ground').startScroll()

    setTimeout(() => {
      this.handleFail(EFailType.GROUND)
    }, 2000)
  }

  handleFail(failType: EFailType) {
    console.log('🚀 ~ gameCtrl ~ handleFail')
    this.startScreen.active = true
    this.ground.getComponent('ground').stopScroll()
  }
}
