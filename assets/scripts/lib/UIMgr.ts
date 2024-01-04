import { _decorator, assetManager, Component, Constructor, instantiate, Node } from 'cc'
const { ccclass, property } = _decorator

// export interface IUIClass {
//   readonly bundleName: string
//   readonly prefabPath: string
//   readonly scriptName: string
//   open: (payload?: any) => void
// }

export class UIClass extends Component {
  readonly bundleName: string
  readonly prefabPath: string
  readonly scriptName: string
  open: (payload?: any) => void
}

@ccclass('UIMgr')
export class UIMgr extends Component {
  private static _instance: UIMgr = null

  public static get instance() {
    return UIMgr._instance
  }

  start() {
    UIMgr._instance = this
  }

  update(deltaTime: number) {}

  open(uiClass: UIClass, payload?: any) {
    assetManager.loadBundle(uiClass.bundleName, (err, bundle) => {
      bundle.load(uiClass.prefabPath, (err, prefab) => {
        const node = instantiate(prefab) as any
        this.node.addChild(node)
        const nodeScript = node.getComponent(uiClass.scriptName)
        nodeScript.open(payload)
      })
    })
  }
}
