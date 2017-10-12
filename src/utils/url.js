export const constructCurrentLocationUrl = (latitude, longitude) => `/bgs/poi/reverse_geo_coding?latitude=${latitude}&longitude=${longitude}`
export const constructSearchUrl = (latitude, longitude, keyword) => `bgs/poi/search_poi_nearby?keyword=${keyword}&offset=0&limit=20&longitude=${longitude}&latitude=${latitude}`
