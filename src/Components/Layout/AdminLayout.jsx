import React from 'react'
import AdminRouter from '../../Router/AdminRouter'
import AdminHeader from '../AdminHeader/AdminHeader'
import Footer from '../Footer/Footer'
import { useLocation } from 'react-router-dom';

function AdminLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <div>
        {/* {isAdminRoute && <AdminHeader />} */}
      {isAdminRoute && <AdminRouter />}
      {/* {isAdminRoute && <Footer />} */}
    </div>
  )
}

export default AdminLayout