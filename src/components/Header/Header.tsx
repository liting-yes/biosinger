import { DatabaseOutlined, SearchOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Logo from '../../assets/icons/logo.svg'
import './Header.scss'

function Header() {
  return (
    <header className="biosinger-header fixed z-99 h-16 w-full flex flex-row items-center justify-between bg-white/1 px-4 shadow backdrop-blur">
      <div>
        <Link to="/">
          <img className="h-10 w-10" src={ Logo } alt="logo" />
        </Link>
      </div>
      <div className="flex flex-row items-center gap-4 font-medium">
        <Link className="biosinger-header__nav-item flex items-center justify-center gap-1 py-2 text-slate-800 no-underline" to="/search">
          <SearchOutlined />
          <span>搜索</span>
        </Link>
        <Link className="biosinger-header__nav-item flex items-center justify-center gap-1 py-2 text-slate-800 no-underline" to="/ncbi/index">
          <DatabaseOutlined />
          <span>NCBI</span>
        </Link>
        <a href="https://github.com/liting-yes/biosinger.git" target="_blank" rel="noreferrer">
          <div className="i-mdi:github h-8 w-8 bg-slate-900" />
        </a>
      </div>
    </header>
  )
}

export default Header
