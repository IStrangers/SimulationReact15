import { isFunction } from "../../shared"
import { Component } from "./component"

class UpdaterQueue {

  public updaters : Array<Updater>  = []
  public isPending : boolean = false

  add(updater : Updater) {
    this.updaters.push(updater)
  }

  batchUpdate() {
    let updater 
    while(updater = this.updaters.pop()) {
      updater.updateComponent()
    }
    this.isPending = false
  }
  
}

const updaterQueue = new UpdaterQueue()

class Updater {
  
  public pendingState : Array<any>
  public nextProps : any

  constructor(public componentInstance : Component) {
    this.pendingState = []
    this.nextProps = null
  }

  addState(partialState : any) {
    this.pendingState.push(partialState)
    this.emitUpdate(null)
  }

  emitUpdate(nextProps : any) {
    this.nextProps = nextProps
    if(nextProps || !updaterQueue.isPending) {
      this.updateComponent()
    } else {
      updaterQueue.add(this)
    }
  }

  updateComponent() {
    if(this.nextProps || this.pendingState.length > 0) {
      shouldUpdate(this.componentInstance,this.nextProps,this.getState())
    }
  }

  getState() {
    let state
    if(this.pendingState.length > 0) {
      this.pendingState.forEach(nextState => {
        if(isFunction(nextState)) {
          state = nextState.call(this.componentInstance,this.componentInstance.state)
        } else {
          state = {...this.componentInstance.state,...nextState}
        }
      })
    }
    this.pendingState.length = 0
    return state
  }
}

function shouldUpdate(componentInstance : Component,nextProps : any,nextState : any) {
  componentInstance.props = nextProps
  componentInstance.state = nextState
  if(!componentInstance.shouldComponentUpdate(nextProps,nextState)) {
    return false
  }
  componentInstance.forceUpdate()
}

export {
  updaterQueue,
  Updater
}