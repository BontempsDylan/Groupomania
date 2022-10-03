import PostList from './PostList';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostList/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
