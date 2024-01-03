import { _decorator, Component, Node } from 'cc'
const { ccclass, property } = _decorator

@ccclass('Ground')
export class Ground extends Component {
  private _isScrolling = false

  start() {}

  update(deltaTime: number) {
    if (this._isScrolling) {
      this.scroll()
    }
  }

  scroll() {
    const start = -380
    const rawWidth = 336
    let newX = this.node.position.x - 2
    if (newX < start - rawWidth) {
      newX = newX + rawWidth
    }
    this.node.setPosition(newX, this.node.position.y, this.node.position.z)
  }

  startScroll() {
    this._isScrolling = true
  }

  stopScroll() {
    this._isScrolling = false
  }
}
