export const constructCurrentLocationUrl = (latitude, longitude) => `/bgs/poi/reverse_geo_coding?latitude=${latitude}&longitude=${longitude}`
export const constructSearchUrl = (latitude, longitude, keyword) => `bgs/poi/search_poi_nearby?keyword=${keyword}&offset=0&limit=20&longitude=${longitude}&latitude=${latitude}`
export const constructCarouselUrl = (latitude, longitude) => `/shopping/v2/entries?latitude=${latitude}&longitude=${longitude}&templates[]=main_template`

export const constructShopUrl = (latitude, longitude, offset) =>
`/shopping/restaurants?latitude=${latitude}&longitude=${longitude}&offset=${offset}&limit=20&extras[]=activities&terminal=h5`


export const constructUserUrl = () => '/eus/v1/current_user?info_raw={}'
const r = {
  credientials: 'include',
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  cache: 'force-cache',

}
export const mobileCode = (data) => {
  const { mobile, captcha } = data
  return fetch('/v4/mobile/verify_code/send', Object.assign({}, r, {
    body: JSON.stringify({
      mobile,
      captcha_code: captcha,
      scene: 'login',
      type: 'sms'
    })
  }))
}

