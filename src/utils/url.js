export const constructCurrentLocationUrl = (latitude, longitude) => `/bgs/poi/reverse_geo_coding?latitude=${latitude}&longitude=${longitude}`
export const constructSearchUrl = (latitude, longitude, keyword) => `bgs/poi/search_poi_nearby?keyword=${keyword}&offset=0&limit=20&longitude=${longitude}&latitude=${latitude}`
export const constructCarouselUrl = (latitude, longitude) => `/shopping/v2/entries?latitude=${latitude}&longitude=${longitude}&templates[]=main_template`

export const constructShopUrl = (latitude, longitude, offset) =>
`/shopping/restaurants?latitude=${latitude}&longitude=${longitude}&offset=${offset}&limit=20&extras[]=activities&terminal=h5`
