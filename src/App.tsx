import './App.scss'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import BiosingerHeader from './components/Header/Header'
import Home from './pages/Home'
import Search from './pages/Search'
import Info from './pages/Info'
import Ncbi from './pages/ncbi/Ncbi'
import NcbiIndex from './pages/ncbi/Index'
import NcbiEinfo from './pages/ncbi/Einfo'
import NcbiEsearch from './pages/ncbi/Esearch'

function App() {
  const pathname = useLocation().pathname

  const [bgColor, setBgColor] = useState('')
  useEffect(() => {
    if (pathname.startsWith('/search'))
      setBgColor('from-[#c2e9fb] to-[#a1c4fd]')
    else if (pathname.startsWith('/ncbi'))
      setBgColor('from-[#fad0c4] to-[#ff9a9e]')
    else
      setBgColor('from-[#a6c0fe] to-[#f68084]')
  }, [pathname])

  return (
    <div className={ `biosinger w-full min-w-256 h-screen overflow-auto transition-colors bg-gradient-to-tr ${bgColor}` }>
      <BiosingerHeader />
      <main className="h-full">
        <Routes>
          <Route index path="/" element={ <Home /> } />
          <Route path="search" element={ <Search /> } />
          <Route path="ncbi" element={ <Ncbi /> }>
            <Route path="/ncbi/index" index element = { <NcbiIndex /> } />
            <Route path="einfo" element = { <NcbiEinfo /> } />
            <Route path="esearch" element={ <NcbiEsearch /> } />
          </Route>
          <Route path="info/:nameCode" element={ <Info /> } />
        </Routes>
      </main>
    </div>
  )
}

export default App
