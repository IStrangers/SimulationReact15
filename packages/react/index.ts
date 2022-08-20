import { flatten, isFunction, isObject, isString, onlyOne } from "../shared"
import { CLASS_COMPONENT, ELEMENT, FUNCTION_COMPONENT, TEXT } from "../types"
import { ReactElement } from "./src/vdom"
import { Component } from "./src/component"
import { batchedUpdates } from "./src/updater"

function createElement(type : any,config : any = {}, ...children : Array<any>) {
  const { key,ref,...props } = config
  let nodeType = TEXT
  if(isString(type)) {
    nodeType = ELEMENT
  } else if(isFunction(type)) {
    nodeType = type.prototype.isReactComponent ? CLASS_COMPONENT : FUNCTION_COMPONENT
  } 
  children = flatten(children).map(child => {
    if(isObject(child) || isFunction(child)) {
      return child
    } else {
      return {nodeType: TEXT,type: TEXT,content: child}
    }
  })
  return ReactElement(nodeType,type,key,ref,props,children)
}

function createRef() {
  return { current: null }
}

function createContext(defaultValue : any) {
  function Provider(props : any,children : Array<any>) {
    Provider["value"] = props.value
    return children
  }
  function Consumer(children : Array<any>) {
    return onlyOne(children)(Provider["value"])
  }
  Provider["value"] = defaultValue
  return { Provider,Consumer }
}

export {
  Component,
  createElement,
  createRef,
  createContext,
  batchedUpdates,
}