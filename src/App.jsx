
import "./styles/dist/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dagangan from "./pages/Dagangan";
import HomeBloxFruit from "./pages/Home-Bloxfruit";
import Home from "./pages/Home";
import Payment from "./pages/Payment";


// import {
//   QueryClient,
//   QueryClientProvider,
//   useQuery,
// } from '@tanstack/react-query'
// import Example from "./pages/Example";

// const queryClient = new QueryClient()

function App() {

  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/blox-fruit" element={<HomeBloxFruit/>}  />
          <Route path={'/dagangan/:productId'} element={<Dagangan  />} />
          <Route path={'/dagangan/:productId/payment'} element={<Payment/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
      
      
  )
}

export default App
