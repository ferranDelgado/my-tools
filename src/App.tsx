
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container mx-auto mt-8">
        <Routes>
          <Route path="/my-tools" element={<Home />} />
          <Route path="/my-tools/about" element={<About />} />
          <Route path="/my-tools/contact" element={<Contact />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App
