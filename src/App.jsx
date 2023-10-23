import { Route, Routes, Outlet } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import React from "react"
import '@fontsource/inter';


function App() {
  React.useEffect(() => {
    document.title = "Ayağıma Gelsin";   }, []);
  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path="/kayit" element={<SignInPage />} />
        <Route path="/giris" element={<SignUpPage />} />
      </Route>
    </Routes>
  )
}

export default App;
