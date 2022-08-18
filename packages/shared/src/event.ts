
function addEventListener(dom : HTMLElement,eventType : string,listener : Function) {
  eventType = eventType.toLowerCase()
  const eventStore = dom["eventStore"] || (dom["eventStore"] = {})
  eventStore[eventType] = listener
  document.addEventListener(eventType.slice(2),dispatchEvent,false)
}

function dispatchEvent(event : Event) {
  
}

export {
  addEventListener,
}