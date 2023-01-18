import React from 'react'
import ReactDOM from 'react-dom/client'
import '@unocss/reset/antfu.css'
import 'uno.css'
import 'virtual:unocss-devtools'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
