import BannerPostList from './BannerPostlist';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Formulaire from './Formulaire';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BannerPostList/>} />
        <Route path="/Formulaire" element={<Formulaire/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
