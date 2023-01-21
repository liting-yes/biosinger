import './App.scss'
import { Route, Routes } from 'react-router-dom'
import BiosingerHeader from './components/Header/Header'
import Home from './pages/Home'
import Search from './pages/Search/Search'
import SearchPlantplus from './pages/Search/SearchPlantplus'

function App() {
  return (
    <div className="biosinger w-full min-w-256 h-screen">
      <BiosingerHeader></BiosingerHeader>
      <main className="h-full mt-16">
        <Routes>
          <Route index path="/" element={<Home />}></Route>
          <Route path="search" element={<Search />}>
            <Route path="plantplus" element={< SearchPlantplus />}></Route>
          </Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
