import { Route, Routes, Outlet } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import SignInPage from "./pages/SignInPage"
import React from "react"
import '@fontsource/inter';
import ShopsPage from "./pages/ShopsPage"
import BasketPage from "./pages/BasketPage"
import Footer from "./components/Footer"
import PaymentPage from "./pages/PaymentPage"
import LoginPage from "./pages/LoginPage"
import { CssBaseline } from "@mui/joy"
import ManagerShopPage from "./pages/manager/ManagerShopPage"
import ErrorPage404 from "./pages/ErrorPage404"
import ManagerIndexPage from "./pages/manager/ManagerIndexPage"
import ManagerShopEditPage from "./pages/manager/ManagerShopEditPage"

function App() {

  return (
    <div>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="/kayit" element={<SignInPage />} />
          <Route path="/giris" element={<LoginPage />} />
          <Route path="/shop/:id" element={<ShopsPage />} />
          <Route path="/sepet" element={<BasketPage />} />
          <Route path="/odeme" element={<PaymentPage />} />
          <Route path="/manager" element={<ManagerIndexPage />} />
          <Route path='/manager' element={<Outlet />}>
            <Route path='magazalarim' element={<ManagerShopPage />} />
            <Route path='magaza/:id' element={<ManagerShopEditPage />} />
          </Route>
        </Route>
        <Route path='*' element={<ErrorPage404 />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
