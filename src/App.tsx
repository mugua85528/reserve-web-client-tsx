import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import ReserveService from "./components/ReserveService";
import ReserveTime from "./components/ReserveTime";
import ReserveProfile from "./components/ReserveProfile";
import ReserveSearch from "./components/ReserveSearch";
import "./styles/style.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/service" element={<ReserveService />} />
          <Route path="/time" element={<ReserveTime />} />
          <Route path="/profile" element={<ReserveProfile />} />
          <Route path="/search" element={<ReserveSearch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
