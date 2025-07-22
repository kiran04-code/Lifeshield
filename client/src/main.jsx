import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/auth.jsx'
import { DocAuthContextProvider } from './context/dockAuth.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <DocAuthContextProvider>
        <App />
      </DocAuthContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
