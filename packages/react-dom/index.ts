import { createDOM } from "../react/src/vdom"

function render(element : any,container : Node) {
  const dom = createDOM(element)
  container.appendChild(dom)
}

export {
  render
}