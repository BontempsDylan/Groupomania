import { BrowserRouter, Routes, Route } from "react-router-dom";

import BannerPostList from './pages/BannerPostlist';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Post" element={<BannerPostList/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
