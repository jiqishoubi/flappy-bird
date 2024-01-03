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

  start() {}

  update(deltaTime: number) {}

  handleStart() {
    console.log('🚀 ~ gameCtrl ~ handleStart')
    this.startScreen.active = false

    setTimeout(() => {
      this.handleFail(EFailType.GROUND)
    }, 2000)
  }

  handleFail(failType: EFailType) {
    console.log('🚀 ~ gameCtrl ~ handleFail')
    this.startScreen.active = true
  }
}
