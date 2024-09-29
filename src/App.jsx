import { Route, Routes, Outlet, useLocation } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import SignInPage from "./pages/SignInPage"
import React from "react"
import '@fontsource/inter';
import ShopsPage from "./pages/ShopsPage"
import BasketPage from "./pages/BasketPage"
import PaymentPage from "./pages/PaymentPage"
import LoginPage from "./pages/LoginPage"
import { Button, CssBaseline, Snackbar, ThemeProvider } from "@mui/joy"
import ManagerShopPage from "./pages/manager/ManagerShopPage"
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
import ManagerProductViewPage from "./pages/manager/products/ManagerProductViewPage"
import { closeSnackbar } from "./redux/snackbarSlice"
import { Check } from "@mui/icons-material"
import { keyframes } from "@emotion/react"

const inAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const outAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
`;

function App() {
  const { expireDate, user, token } = useSelector((state) => state.user);
  const { snackbar } = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();
  const location = useLocation();

  React.useEffect(() => {
    if ((user != "" || token != "") && new Date().getTime() > expireDate)
      dispatch(userLogout());
  }, []);
  return (
    <>
      <CssBaseline />
      {/* {location.pathname.startsWith("/manager") && <ManagerSidebar />} */}
      <Routes>
        <Route path='/' element={!location.pathname.startsWith('/manager') && <Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="/kayit" element={<SignInPage />} />
          <Route path="/giris" element={<LoginPage />} />
          <Route path="/sifremi-unuttum" element={<ForgotPassword />} />
          <Route path="/sifre-sifirla/:token" element={<ResetPassword />} />
          <Route path="/shop/:id" element={<ShopsPage />} />
          <Route path="/sepet" element={<BasketPage />} />
          <Route path="/odeme" element={<PaymentPage />} />
          <Route path="/siparislerim" element={<OrdersPage />} />
          <Route path="/manager" element={<ManagerLayout />} >
            <Route index element={<ManagerIndexPage2 />} />
            <Route path='magazalarim' element={<ManagerShopPage />} />
            <Route path='magaza/:id' element={<ManagerShopEditPage />} />
            <Route path="siparisler" element={<ManagerOrdersPage />} />
            <Route path="urunler" element={<ManagerProductsPage />} />
            <Route path="urunler/:id" element={<ManagerProductViewPage />} />
          </Route>
        </Route>
        <Route path='*' element={<ErrorPage404 />} />
      </Routes>
      {//if url inside manager
        !location.pathname.startsWith("/manager") &&
        <Footer2 />
      }

      <Snackbar
        variant="solid"
        //color="success"
        open={!!snackbar}
        onClose={() => dispatch(closeSnackbar())}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        startDecorator={<Check />}
        autoHideDuration={3000}
        {...snackbar}
        endDecorator={
          <Button
            onClick={() => dispatch(closeSnackbar())}
            size="sm"
            variant="solid"
            color={snackbar?.color}
          >
            OK
          </Button>
        }
        //sx={{ ml: 1 }}
        animationDuration={600}
        sx={{
          ml: 1,
          animation: snackbar?.open
            ? `${inAnimation} ${600}ms forwards`
            : `${outAnimation} ${600}ms forwards`,
        }}
      />
    </>
  )
}

export default App;
