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
import ManagerOrdersPage from "./pages/manager/ManagerOrdersPage"
import { useDispatch, useSelector } from "react-redux"
import { userLogout } from "./redux/userSlice"
import Footer2 from "./components/Footer2"
import OrdersPage from "./pages/OrdersPage"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"

function App() {
  const { expireDate, user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if ((user != "" || token != "") && new Date().getTime() > expireDate)
      dispatch(userLogout());
  }, []);

  return (
    <div>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="/kayit" element={<SignInPage />} />
          <Route path="/giris" element={<LoginPage />} />
          <Route path="/sifremi-unuttum" element={<ForgotPassword />} />
          <Route path="/sifre-sifirla/:token" element={<ResetPassword />} />
          <Route path="/shop/:id" element={<ShopsPage />} />
          <Route path="/sepet" element={<BasketPage />} />
          <Route path="/odeme" element={<PaymentPage />} />
          <Route path="/siparislerim" element={<OrdersPage />} />
          <Route path="/manager" element={<ManagerIndexPage />} />
          <Route path='/manager' element={<Outlet />}>
            <Route path='magazalarim' element={<ManagerShopPage />} />
            <Route path='magaza/:id' element={<ManagerShopEditPage />} />
            <Route path="siparisler" element={<ManagerOrdersPage />} />
          </Route>
        </Route>
        <Route path='*' element={<ErrorPage404 />} />
      </Routes>
      <Footer2 />
    </div>
  )
}

export default App;
