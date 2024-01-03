import { _decorator, Component, Node, Sprite } from 'cc'
const { ccclass, property } = _decorator

@ccclass('Pipe')
export class Pipe extends Component {
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
