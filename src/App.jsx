import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '@/assets/styles/app.scss'
import AppRoutes from '@/routes/AppRoutes'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <AppRoutes />
        <ToastContainer
          position='top-right'
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={true}
          closeButton={false}
        />
      </Provider>
    </React.Fragment>
  )
}

export default App
