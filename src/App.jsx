import { Route, Routes, Outlet } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AboutUs from "./pages/AboutUs"
import Navbar from "./components/Navbar"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import React from "react"

function App() {
  React.useEffect(() => {
    document.title = "Ayağıma Gelsin";   }, []);
  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<AboutUs />} />
        <Route path="/kayit" element={<SignInPage />} />
        <Route path="/giris" element={<SignUpPage />} />
      </Route>
    </Routes>
  )
}

export default App;
