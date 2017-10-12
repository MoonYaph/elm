const url = 'https://fuss10.elemecdn.com/'
export const constructHashUrl = (link) => {
  if (link) {
    let l = link.split('')
    l.splice(1, 0, '/')
    l.splice(4, 0, '/')
    l = l.join('')
    const left = /(jpg|gif|png|jpeg)$/.exec(link)
    return `${url}${l}.${left[0]}`
  }
  return null
}
export default constructHashUrl
