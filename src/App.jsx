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
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
