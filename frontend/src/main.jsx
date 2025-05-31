import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'
import { DataContextProvider } from './contexts/DataContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataContextProvider>
      <App />
      <Toaster richColors position="top-center" />
    </DataContextProvider>
  </StrictMode>
)
