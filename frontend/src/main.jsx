import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouting from './routing.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouting />
  </StrictMode>,
)
