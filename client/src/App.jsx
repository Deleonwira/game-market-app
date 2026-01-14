
import "./styles/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailPage";
import HomePage from "./pages/HomePage";
import SplashPage from "./pages/SplashPage";
import PaymentPage from "./pages/PaymentPage";

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
          <Route index element={<SplashPage/>}/>
          <Route path="/blox-fruit" element={<HomePage/>}  />
          <Route path={'/dagangan/:productId'} element={<ProductDetailPage  />} />
          <Route path={'/dagangan/:productId/payment'} element={<PaymentPage/>}/>
        </Routes>
      </BrowserRouter>      
    </>
      
      
  )
}

export default App
