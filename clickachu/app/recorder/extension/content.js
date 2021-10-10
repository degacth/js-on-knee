const cssSelector = el => CssSelectorGenerator.getCssSelector(el)
const {address} = CLICKACHU_CONFIG

const socket = new WebSocket(`ws://${address}`)
socket.json = data => socket.send(JSON.stringify(data))
const sendEvent = (type, el) => socket.json({type, el})

socket.onopen = () => {
  document.addEventListener('click', event => {
    const selector = cssSelector(event.target)
    sendEvent('click', selector)
  }, true)
}
