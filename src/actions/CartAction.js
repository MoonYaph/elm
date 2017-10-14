export function addCart (res) {
  return {
    type: 'ADD_CART',
    res
  }
}
export function removeCart (res) {
  return {
    type: 'REMOVE_CART',
    res
  }
}

export function emptyCart () {
  return {
    type: 'EMPTY_CART',
  }
}
