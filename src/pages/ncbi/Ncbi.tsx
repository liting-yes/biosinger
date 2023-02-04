import { Link, Outlet } from 'react-router-dom'

const sidebar: { key: string; path: string; label: string }[] = [
  {
    key: 'einfo',
    path: '/ncbi/einfo',
    label: 'EInfo',
  }, {
    key: 'esearch',
    path: '/ncbi/esearch',
    label: 'ESearch',
  },
]

function Ncbi() {
  return (
    <div className="biosinger mx-auto w-256 flex gap-8 py-28">
      <ul className="w-24 list-none overflow-hidden rounded bg-[#ff9a9e] p-0 shadow">
        {sidebar.map((item) => {
          return <li className="h-8 transition-colors hover:bg-[#fad0c4]" key={ item.key }><Link className="inline-block h-full pl-4 leading-8 text-white no-underline" to={ item.path }>{item.label}</Link></li>
        })}
      </ul>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Ncbi
