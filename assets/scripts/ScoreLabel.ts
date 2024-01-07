import { _decorator, Component, Label, Node } from 'cc'
import { GlobalData } from './GlobalData'
const { ccclass, property } = _decorator

@ccclass('ScoreLabel')
export class ScoreLabel extends Component {
  start() {}

  update(deltaTime: number) {
    // 获取labe 文字
    const thisString = this.node.getComponent(Label).string
    if (Number(thisString) !== Number(GlobalData.score)) {
      this.node.getComponent(Label).string = GlobalData.score + ''
    }
  }
}
