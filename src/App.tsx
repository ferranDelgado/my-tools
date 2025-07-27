import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ExifReader from "./pages/ExifReader";
import Home from "./pages/Home";
import JwtReader from "./pages/JwtReader";
import Timezones from "./pages/Timezones";
import UuidGenerator from "./pages/UuidGenerator";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container mx-auto mt-8">
        <Routes>
          <Route path="/my-tools" element={<Home />} />
          <Route path="/my-tools/jwt-reader" element={<JwtReader />} />
          <Route path="/my-tools/exif-reader" element={<ExifReader />} />
          <Route path="/my-tools/uuid-generator" element={<UuidGenerator />} />
          <Route path="/my-tools/timezones" element={<Timezones />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
