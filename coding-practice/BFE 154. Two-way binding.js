const state = { value: 'BFE' }

Object.defineProperty(state, "_value", {
  value: state.value,
  enumerable: false,
  writable: true
})

Object.defineProperty(state, "value", {
  enumerable: true,
  set(v) {
    state._value = v
    element._value = v
  },
  get() {
    return state._value
  }
})

Object.defineProperty(element, "_value", {
  value: element.value,
  enumerable: false,
  writable: true
})

Object.defineProperty(element, "value", {
  enumerable: true,
  set(v) {
    element._value = v
    state._value = v
  },
  get() {
    return element._value
  }
})

state.value = "BFE New"
console.log(state.value)
