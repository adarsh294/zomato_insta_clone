import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import "remixicon/fonts/remixicon.css";
import Approuter from './routes/Approuter.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Approuter} />
  </StrictMode>
)
