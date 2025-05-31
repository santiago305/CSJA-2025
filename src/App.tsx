
import { Suspense } from 'react'
import './globals.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Router'
import { AuthProvider } from './provider/authProvider'
function App() {


  return (
    <AuthProvider>
      <Suspense fallback={<>Cargando aplicación...</>}>
            <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  )
}

export default App
