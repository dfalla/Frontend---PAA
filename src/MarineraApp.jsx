import { Suspense } from "react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./core/router/AppRouter"
import { store } from "./core/store"



export const MarineraApp = () => {
  return (
    <Provider store = { store }>
      <Suspense fallback={<p>Cargando...</p>}>
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </Suspense>
    </Provider>
  )
}


