
import { Suspense } from 'react'
import './globals.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Router'
function App() {


  return (
    // por encima va el proveedor
    <Suspense fallback={<>Cargando aplicación...</>}>
          <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
