import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/icons/logo.svg'

const items: MenuProps['items'] = [{
  label: '搜索',
  key: 'search',
  icon: <SearchOutlined />,
  children: [{
    type: 'group',
    label: '植物',
    children: [
      {
        label: '植物科学数据中心',
        key: 'plantplus',
      },
    ],
  }],
}]

function Header() {
  const navigate = useNavigate()
  const handleClickMenu: MenuProps['onClick'] = (e) => {
    const path = `/${e.keyPath[1]}/${e.keyPath[0]}`
    navigate(path)
  }

  return <header className="biosinger-header fixed w-full h-16 bg-white/50 shadow backdrop-blur px-4 flex flex-row justify-between items-center">
    <div>
      <Link to="/">
        <img className="w-12 h-12" src={Logo} />
      </Link>
    </div>
    <div className="flex flex-row items-center gap-4">
      <Menu mode="horizontal" items={items} onClick={handleClickMenu} selectable={false} style={{ border: 'none', background: 'transparent' }} />
     <a href="https://github.com/liting-yes/biosinger.git" target="_blank" rel="noreferrer">
      <div className="i-mdi:github w-8 h-8"/>
     </a>
    </div>
  </header>
}

export default Header
