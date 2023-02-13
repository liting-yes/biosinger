import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import '@unocss/reset/tailwind.css'
import '@kidonng/daisyui/index.css'
import 'uno.css'
import 'antd/dist/reset.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>,
  </React.StrictMode>,
)
