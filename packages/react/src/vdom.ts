import { flatten, onlyOne } from "../../shared"
import { addEventListener } from "./event"
import { CLASS_COMPONENT, ELEMENT, FUNCTION_COMPONENT, TEXT } from "../../types"

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
  } else if(nodeType === CLASS_COMPONENT){
    dom = createClassComponentDOM(element)
  } else if(nodeType === FUNCTION_COMPONENT){
    dom = createFunctionComponentDOM(element)
  } else {
    dom = document.createComment(element.content ? element.content : "")
  }
  element.dom = dom
  return dom
}

function createNativeDOM(element : any) : HTMLElement {
  const { type,props,children } = element
  const dom = document.createElement(type)
  props && setProps(dom,props)
  children && createDOMChildren(dom,children)
  return dom
}

function createDOMChildren(parentNode : Node,children : Array<any>) {
  children && flatten(children).forEach((child,index) => {
    child["mountIndex"] = index
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

function createClassComponentDOM(element : any) {
  const { type,props } = element
  const componentInstance = new type(props)
  const renderElement = componentInstance.render()
  const dom = createDOM(renderElement)
  renderElement.dom = dom
  componentInstance.renderElement = renderElement
  element.componentInstance = componentInstance
  return dom
}

function createFunctionComponentDOM(element : any) {
  const { type,props } = element
  const renderElement = type(props)
  const dom = createDOM(renderElement)
  renderElement.dom = dom
  element.renderElement = renderElement
  return dom
}



function compareTwoElements(oldRenderElement : any,newRenderElement : any) {
  oldRenderElement = onlyOne(oldRenderElement)
  newRenderElement = onlyOne(newRenderElement)
  const currentDOM = oldRenderElement.dom
  let currentElement = oldRenderElement
  if(newRenderElement === null) {
    currentDOM.parentNode.removeChild(currentDOM)
  } else if(oldRenderElement.type !== newRenderElement.type) {
    const newDOM = createDOM(newRenderElement)
    currentDOM.parentNode.replaceChild(newDOM,currentDOM)
    currentElement = newRenderElement
  } else {
    
    currentElement = newRenderElement
  }
  return currentElement
}

export {
  ReactElement,
  createDOM,
  createNativeDOM,
  createDOMChildren,
  setProps,
  setProp,
  compareTwoElements,
}