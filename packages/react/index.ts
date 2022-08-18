import { isObject, isString } from "../shared"
import { ELEMENT, TEXT } from "../types"
import { ReactElement } from "./src/vdom"

function createElement(type : any,config : any = {}, ...children : Array<any>) {
  const { key,ref,...props } = config
  let nodeType = TEXT
  if(isString(type)) {
    nodeType = ELEMENT
  }
  children = children.map(child => {
    if(isObject(child)) {
      return child
    } else {
      return {nodeType: TEXT,type: TEXT,content: child}
    }
  })
  return ReactElement(nodeType,type,key,ref,props,children)
}

export {
  createElement,
}