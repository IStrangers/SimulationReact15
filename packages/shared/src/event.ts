import { isFunction } from "./utils"

function addEventListener(dom : HTMLElement,eventType : string,listener : Function) {
  eventType = eventType.toLowerCase()
  const eventStore = dom["eventStore"] || (dom["eventStore"] = {})
  eventStore[eventType] = listener
  document.addEventListener(eventType.slice(2),dispatchEvent,false)
}

let syntheticEvent : SyntheticEvent | null = null
function dispatchEvent(event : Event) {
  let { type,target } = event
  const eventType = `on${type}`
  syntheticEvent = getSyntheticEvent(event)
  while (target) {
    const eventStore = target["eventStore"]
    const listener = eventStore && eventStore[eventType]
    if(listener) {
      listener.call(target,syntheticEvent)
    }
    target = target["parentNode"]
  }
  for(let key in syntheticEvent) {
    syntheticEvent[key] = undefined
  }
}

class SyntheticEvent {
  persist() {
    syntheticEvent = null
  }
}
function getSyntheticEvent(nativeEvent : Event) {
  if(!syntheticEvent) {
    syntheticEvent = new SyntheticEvent()
  }
  syntheticEvent["nativeEvent"] = nativeEvent
  for(let key in nativeEvent) {
    const value = nativeEvent[key]
    if(isFunction(value)) {
      syntheticEvent[key] = value.bind(nativeEvent)
    } else {
      syntheticEvent[key] = value
    }
  }
  return syntheticEvent
}

export {
  addEventListener,
}