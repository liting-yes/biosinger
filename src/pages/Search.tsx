import { useParams } from 'react-router-dom'

interface SiteMap {
  [key: string]: string
}
const siteMap: SiteMap = {
  plantplus: 'https://www.plantplus.cn/cn',
}

function Search() {
  const { site } = useParams()
  return <div className="biosinger-search">Search {site && siteMap[site]}</div>
}

export default Search
