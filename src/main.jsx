import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/features/store.js';
import './index.css'
import "remixicon/fonts/remixicon.css";
import Approuter from './routes/Approuter.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={Approuter} />
    </Provider>
  </StrictMode>
)
