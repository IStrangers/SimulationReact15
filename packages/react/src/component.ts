
class Component {
  constructor(public props : any) {

  }
}

Component.prototype["isReactComponent"] = true

export {
  Component
}