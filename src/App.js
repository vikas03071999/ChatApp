import Register from "./pages/Register";
import Login from "./pages/Login";
import "./style.scss";
import Home from "./pages/Home";
import { BrowserRouter,Routes,Route, HashRouter } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {

  const {loggedInUser} = useContext(AuthContext);
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={loggedInUser ? <Home />:<Login/>} />
        <Route path="/register" element ={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
