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

module.exports = {keydown, click}