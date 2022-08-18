import { onlyOne } from "../../shared"
import { addEventListener } from "../../shared/src/event"
import { ELEMENT, TEXT } from "../../types"

function ReactElement(nodeType : Symbol,type : any,key : any,ref : any,props : any,children : Array<any>) {
  const element = {
    nodeType,
    type,
    key,
    ref,
    props,
    children
  }
  return element
}

function createDOM(element : any) : Node {
  element = onlyOne(element)
  let dom : Node
  const { nodeType } = element
  if(nodeType === TEXT) {
    dom = document.createTextNode(element.content)
  } else if(nodeType === ELEMENT){
    dom = createNativeDOM(element)
  } else {
    dom = document.createComment(element.content ? element.content : "")
  }
  return dom
}

function createNativeDOM(element : any) : HTMLElement {
  const { type,props,children } = element
  const dom = document.createElement(type)
  props && setProps(dom,props)
  children && createNativeDOMChildren(dom,props.children)
  return dom
}

function createNativeDOMChildren(parentNode : Node,children : Array<any>) {
  children && children.flat(Infinity).forEach(child => {
    const childDOM = createDOM(child)
    parentNode.appendChild(childDOM)
  })
}

function setProps(dom : HTMLElement,props : any) {
  for(let key in props) {
    setProp(dom,key,props[key])
  }
}

function setProp(dom : HTMLElement,key : string,value : any) {
  if(/^on/.test(key)) {
    addEventListener(dom,key,value)
  } else if(key === "className") {
    dom.className = value
  } else if(key === "style") {
    for(let styleName in value) {
      dom.style[styleName] = value[styleName]
    }
  } else {
    dom.setAttribute(key,value)
  }
}

export {
  ReactElement,
  createDOM,
  createNativeDOM,
  createNativeDOMChildren,
  setProps,
  setProp,
}