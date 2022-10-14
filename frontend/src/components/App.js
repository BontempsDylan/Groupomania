import BannerPostList from './BannerPostlist';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Post" element={<BannerPostList/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
