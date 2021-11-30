const cssSelector = el => CssSelectorGenerator.getCssSelector(el)
const {address} = CLICKACHU_CONFIG

const socket = new WebSocket(`ws://${address}`)
socket.json = data => socket.send(JSON.stringify(data))
const sendEvent = (type, el, payload) => socket.json({type, el, payload})

const eventHandlers = {
  click: {
    extractElement: event => {
      const {target} = event
      if (event.screenX && event.screenY) return target
    }
  },
  keydown: {
    extractElement: event => {
      const omitKeys = ['Shift']
      if (omitKeys.includes(event.key)) return
      return event.target
    },
    payload: event => ({key: event.key})
  },
}

socket.onopen = () => Object.keys(eventHandlers).forEach(eventName => {
  const handler = eventHandlers[eventName]
  const extractor = handler.extractElement

  document.addEventListener(eventName, event => {
    const element = extractor(event)
    if (!element) return

    const selector = cssSelector(element)
    if (!selector) return

    sendEvent(eventName, selector, handler.payload?.(event) ?? null)
  }, true)
})