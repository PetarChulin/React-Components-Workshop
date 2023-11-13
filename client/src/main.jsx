import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UsersProvider } from './contexts/UsersContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UsersProvider>
  <App />
  </UsersProvider>
)
