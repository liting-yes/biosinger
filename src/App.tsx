import './App.scss'
import { Route, Routes } from 'react-router-dom'
import BiosingerHeader from './components/Header/Header'
import Home from './pages/Home'
import Search from './pages/Search'

function App() {
  return (
    <div className="biosinger w-full min-w-256 h-screen">
      <BiosingerHeader></BiosingerHeader>
      <main className="h-full mt-16">
        <Routes>
          <Route index path="/" element={<Home />}></Route>
          <Route index path="/search/:site" element={<Search />}></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
