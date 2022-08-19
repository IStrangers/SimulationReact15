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

  static getDerivedStateFromProps(nextProps : any,oldState : any) {
    return oldState
  }

  render() {
  }

  setState(partialState : any) {
    this.$updater.addState(partialState)
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps : any) {
  }

  shouldComponentUpdate(nextProps : any,nextState : any) {
    return true
  }

  getSnapshotBeforeUpdate() {
  }

  componentWillUpdate() {
  }

  componentDidUpdate(props : any,state : any,extraArgs : any) {
  }

  componentWillUnmount() {
  }

  forceUpdate() {
    this.componentWillUpdate()
    const extraArgs = this.getSnapshotBeforeUpdate()
    const oldRenderElement = this["renderElement"]
    const newRenderElement = this.render()
    this["renderElement"] = compareTwoElements(oldRenderElement,newRenderElement)
    this.componentDidUpdate(this.props,this.state,extraArgs)
  }
}

Component.prototype["isReactComponent"] = true

export {
  Component
}