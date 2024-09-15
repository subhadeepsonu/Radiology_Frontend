import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/navbar.tsx'
import Footer from './components/footer.tsx'
import UserProvider from './context/userprovider.tsx'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <NavBar />
          <Toaster richColors />
          <App />
        </UserProvider>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
