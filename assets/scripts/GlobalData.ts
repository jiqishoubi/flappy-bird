import { _decorator, Component, Node } from 'cc'
import { AudioMgr } from './AudioMgr'
const { ccclass, property } = _decorator

export class GlobalData {
  static isStart = false
  static score = 0
  static addScore() {
    this.score++
    AudioMgr.instance.playOneShot(AudioData.point)
  }
}

export class AudioData {
  static die = 'Audio/die'
  static hit = 'Audio/hit'
  static point = 'Audio/point'
  static swoosh = 'Audio/swoosh'
}
