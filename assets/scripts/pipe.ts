import { _decorator, Component, Node, Sprite } from 'cc'
const { ccclass, property } = _decorator

@ccclass('pipe')
export class pipe extends Component {
  @property({
    type: Sprite,
    displayName: '上管道',
  })
  private topPipe: Sprite = null

  @property({
    type: Sprite,
    displayName: '下管道',
  })
  private bottomPipe: Sprite = null

  start() {}

  update(deltaTime: number) {}
}
