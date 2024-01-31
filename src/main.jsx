import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import SetRoutes from './jsx/routes/SetRoutes'
import { Provider } from 'react-redux'
import store from './jsx/redux/store'
// import CardHeader from 'react-bootstrap/esm/CardHeader'

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <Provider store={store}>
    <SetRoutes />
    </Provider>
  </BrowserRouter>

)
