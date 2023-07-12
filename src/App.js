import './App.css';
import Auth from "./pages/Auth";
import Game from './pages/Game';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/game" element={<Game />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
