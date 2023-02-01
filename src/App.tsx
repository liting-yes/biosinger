import './App.scss'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import BiosingerHeader from './components/Header/Header'
import Home from './pages/Home'
import Search from './pages/Search/Search'
import SearchSp2000 from './pages/Search/SearchSp2000'
import Info from './pages/Info'

function App() {
  const pathname = useLocation().pathname

  const [bgColor, setBgColor] = useState('')
  useEffect(() => {
    if (pathname.startsWith('/search'))
      setBgColor('from-[#f5f7fa] to-[#c3cfe2]')
    else
      setBgColor('from-[#a6c0fe] to-[#f68084]')
  }, [pathname])

  return (
    <div className={ `biosinger w-full min-w-256 h-screen transition-colors bg-gradient-to-tr ${bgColor}` }>
      <BiosingerHeader />
      <main className="h-full">
        <Routes>
          <Route index path="/" element={ <Home /> } />
          <Route path="search" element={ <Search /> }>
            <Route path="sp2000" element={ <SearchSp2000 /> } />
          </Route>
          <Route path="info/:nameCode" element={ <Info /> } />
        </Routes>
      </main>
    </div>
  )
}

export default App
