import { _decorator, Component, Node } from 'cc'
const { ccclass, property } = _decorator

@ccclass('GlobalData')
export class GlobalData extends Component {
  static isStart = false

  start() {}

  update(deltaTime: number) {}
}
