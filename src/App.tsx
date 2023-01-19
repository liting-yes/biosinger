import './App.scss'
import { Outlet, Route, Routes } from 'react-router-dom'
import BiosingerHeader from './components/Header/Header'
import Home from './pages/Home'

function App() {
  return (
    <div className="biosinger w-full min-w-256 h-screen">
      <BiosingerHeader></BiosingerHeader>
      <Routes>
        <Route index path='/' element={<Home />}></Route>
      </Routes>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default App
