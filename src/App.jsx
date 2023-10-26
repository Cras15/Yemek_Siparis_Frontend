import { Route, Routes, Outlet } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import React from "react"
import '@fontsource/inter';
import ShopsPage from "./pages/ShopsPage"
import BasketPage from "./pages/BasketPage"
import Footer from "./components/Footer"

function App() {
  React.useEffect(() => {
    document.title = "Ayağıma Gelsin";
  }, []);
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="/kayit" element={<SignInPage />} />
          <Route path="/giris" element={<SignUpPage />} />
          <Route path="/shop/:id" element={<ShopsPage />} />
          <Route path="/basket" element={<BasketPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
