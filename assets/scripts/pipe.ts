import { _decorator, Component, Node, Sprite } from 'cc'
const { ccclass, property } = _decorator

@ccclass('pipe')
export class pipe extends Component {
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

  update(deltaTime: number) {}
}
