const keydown = (el, key) => ({
  el,
  type: 'keydown',
  payload: {key}
})

const click = el => ({
  el,
  type: 'click',
  payload: null,
})

const enter = el => ({
  el,
  type: 'mouseenter',
  payload: null,
})

module.exports = {keydown, click, enter}