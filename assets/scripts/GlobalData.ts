import { _decorator, Component, Node } from 'cc'
const { ccclass, property } = _decorator

export class GlobalData {
  static isStart = false
  static score = 0
  static addScore() {
    this.score++
  }
}
