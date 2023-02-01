import type { MenuProps } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/icons/logo.svg'

const items: MenuProps['items'] = [{
  label: '搜索',
  key: 'search',
  icon: <SearchOutlined />,
  children: [{
    label: '物种2000中国节点',
    key: 'sp2000',
  }],
}]

function Header() {
  const navigate = useNavigate()
  const handleClickMenu: MenuProps['onClick'] = (e) => {
    const path = `/${e.keyPath[1]}/${e.keyPath[0]}`
    navigate(path)
  }

  return (
    <header className="biosinger-header fixed w-full h-16 bg-white/1 shadow backdrop-blur px-4 flex flex-row justify-between items-center">
      <div>
        <Link to="/">
          <img className="w-10 h-10" src={ Logo } alt="logo" />
        </Link>
      </div>
      <div className="flex flex-row items-center gap-4 font-medium">
        <Link className="flex justify-center items-center gap-1 no-underline text-slate-800" to="/search">
          <SearchOutlined />
          <span>搜索</span>
        </Link>
        {/* <Menu
          mode="horizontal"
          items={ items }
          onClick={ handleClickMenu }
          selectable={ false }
          style={{ border: 'none', background: 'transparent' }}
        /> */}
        <a href="https://github.com/liting-yes/biosinger.git" target="_blank" rel="noreferrer">
          <div className="i-mdi:github w-8 h-8 bg-slate-900" />
        </a>
      </div>
    </header>
  )
}

export default Header
