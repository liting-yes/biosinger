import './App.scss'
import { Route, Routes } from 'react-router-dom'
import BiosingerHeader from './components/Header/Header'
import Home from './pages/Home'
import Search from './pages/Search/Search'
import SearchSp2000 from './pages/Search/SearchSp2000'
import Info from './pages/Info'

function App() {
  return (
    <div className="biosinger w-full min-w-256 h-screen">
      <BiosingerHeader></BiosingerHeader>
      <main className="h-full">
        <Routes>
          <Route index path="/" element={<Home />}></Route>
          <Route path="search" element={<Search />}>
            <Route path="sp2000" element={< SearchSp2000 />}></Route>
          </Route>
          <Route path="info/:nameCode" element={<Info />}>
          </Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
