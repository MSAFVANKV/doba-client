import { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import AdminLayout from './Components/Layout/AdminLayout'
import './Styles/Home.css'
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor } from './ReduxToolKit/Store'


function App() {

  return (
    // <PersistGate loading={null} persistor={persistor}>
    <>
     <Layout/>
     {/* <Routes>
        <Route path='/admin' element={<AdminLayout/>}/>
     </Routes> */}
     <AdminLayout/>
    </>
    

  )
}

export default App
