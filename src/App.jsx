import { Route, Routes, Outlet, useLocation, useNavigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import SignInPage from "./pages/SignInPage"
import React from "react"
import '@fontsource/inter';
import ShopsPage from "./pages/ShopsPage"
import BasketPage from "./pages/BasketPage"
import PaymentPage from "./pages/PaymentPage"
import LoginPage from "./pages/LoginPage"
import { Box, Button, CssBaseline, extendTheme, Snackbar } from "@mui/joy"
import ErrorPage404 from "./pages/ErrorPage404"
import ManagerShopEditPage from "./pages/manager/ManagerShopEditPage"
import ManagerOrdersPage from "./pages/manager/ManagerOrdersPage"
import { useDispatch, useSelector } from "react-redux"
import { userLogout } from "./redux/userSlice"
import Footer2 from "./components/Footer2"
import OrdersPage from "./pages/OrdersPage"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import ManagerIndexPage2 from "./pages/manager/ManagerIndexPage2"
import ManagerLayout from "./components/ManagerLayout"
import ManagerProductsPage from "./pages/manager/products/ManagerProductsPage"
import ManagerOrderViewPage from "./pages/manager/ManagerOrderViewPage"
import ManagerProductEditPage from "./pages/manager/products/ManagerProductEditPage"
import UserProfile from "./pages/UserProfile"
import AdminIndexPage from "./pages/admin/AdminIndexPage"
import AdminLayout from "./pages/admin/AdminLayout"
import AdminUserListPage from "./pages/admin/AdminUserListPage"
import AdminShopApplicationPage from "./pages/admin/AdminShopApplicationPage"
import {
  extendTheme as materialExtendTheme,
  CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import Layout from "./components/Layout"
import ShopApplicationPage from "./pages/ShopApplicationPage"

function App() {
  const { expireDate, user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const materialTheme = materialExtendTheme();

  const theme = extendTheme({
    colorSchemeSelector: 'media',
  });

  React.useEffect(() => {
    if ((user != "" || token != "") && new Date().getTime() > expireDate) {
      dispatch(userLogout());
      navigate("/");
    }
  }, []);
  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/kayit" element={<SignInPage />} />
            <Route path="/giris" element={<LoginPage />} />
            <Route path="/profil" element={<UserProfile />} />
            <Route path="/sifremi-unuttum" element={<ForgotPassword />} />
            <Route path="/sifre-sifirla/:token" element={<ResetPassword />} />
            <Route path="/shop/:id" element={<ShopsPage />} />
            <Route path="/sepet" element={<BasketPage />} />
            <Route path="/odeme" element={<PaymentPage />} />
            <Route path="/siparislerim" element={<OrdersPage />} />
            <Route path="/magaza-basvuru" element={<ShopApplicationPage />} />

            {/* Yönetici */}
            <Route path="/manager" element={<ManagerLayout />}>
              <Route index element={<ManagerIndexPage2 />} />
              <Route path='magaza/:id' element={<ManagerShopEditPage />} />
              <Route path="siparisler" element={<ManagerOrdersPage />} />
              <Route path="siparisler/:id" element={<ManagerOrderViewPage />} />
              <Route path="urunler" element={<ManagerProductsPage />} />
              <Route path="urunler/edit/:id" element={<ManagerProductEditPage />} />
            </Route>

            {/* Admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminIndexPage />} />
              <Route path="kullanicilar" element={<AdminUserListPage />} />
              <Route path="magaza-basvuru" element={<AdminShopApplicationPage />} />
            </Route>

            {/* Hata */}
            <Route path='*' element={<ErrorPage404 />} />
          </Route>
        </Routes>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  )
}

export default App;
