import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ExifReader from "./pages/ExifReader";
import Home from "./pages/Home";
import JwtReader from "./pages/JwtReader";
import Timezones from "./pages/Timezones";
import UuidGenerator from "./pages/UuidGenerator";

function App() {
  return (
    <HashRouter>
      <Header />
      <main className="container mx-auto mt-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jwt-reader" element={<JwtReader />} />
          <Route path="/exif-reader" element={<ExifReader />} />
          <Route path="/uuid-generator" element={<UuidGenerator />} />
          <Route path="/timezones" element={<Timezones />} />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;
