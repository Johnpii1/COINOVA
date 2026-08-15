import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CryptoList from "./components/CryptoList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

<Hero />
      <main className="pt-28">
        <Routes>
          <Route path="/" element={<CryptoList />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;