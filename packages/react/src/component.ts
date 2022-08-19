import { Updater } from "./updater"
import { compareTwoElements } from "./vdom"

class Component {

  public $updater
  public state : any
  public nextProps : any

  constructor(public props : any) {
    this.$updater = new Updater(this)
    this.state = {}
    this.nextProps = null
  }

  render() {
  }

  setState(partialState : any) {
    this.$updater.addState(partialState)
  }

  shouldComponentUpdate(nextProps : any,nextState : any) {
    return true
  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
  }

  forceUpdate() {
    this.componentWillUpdate()
    const oldRenderElement = this["renderElement"]
    const newRenderElement = this.render()
    this["renderElement"] = compareTwoElements(oldRenderElement,newRenderElement)
    this.componentDidUpdate()
  }
}

Component.prototype["isReactComponent"] = true

export {
  Component
}