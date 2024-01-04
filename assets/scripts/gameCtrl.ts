import { _decorator, Component, Node } from 'cc'
import { Ground } from './Ground'
import { Bird } from './Bird'
const { ccclass, property } = _decorator

enum EFailType {
  PIPE,
  GROUND,
}

@ccclass('GameCtrl')
export class GameCtrl extends Component {
  @property({
    type: Node,
    displayName: 'startScreen',
  })
  private startScreen: Node = null

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

  start() {}

  update(deltaTime: number) {}

  handleStart() {
    console.log('handleStart')
    this.startScreen.active = false
    this.ground.startScroll()
    this.bird.startGame()

    setTimeout(() => {
      this.handleFail(EFailType.GROUND)
    }, 2000)
  }

  handleFail(failType: EFailType) {
    console.log('handleFail')
    this.startScreen.active = true
    this.ground.stopScroll()
    this.bird.stopGame()  
  }
}
