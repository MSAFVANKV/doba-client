import React from 'react'

import Header from '../Header/Header'
import Routers from '../../Router/Routers'
import Footer from '../Footer/Footer'
import { useLocation } from 'react-router-dom';
// import AdminRouter from '../../Router/AdminRouter'

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <div>
        {!isAdminRoute && <Header />}
      {!isAdminRoute &&<Routers />}
      {!isAdminRoute && <Footer />}
    </div>
  )
}

export default Layout