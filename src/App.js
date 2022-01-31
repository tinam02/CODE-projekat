import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//pages
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPassPage from "./pages/ForgotPassPage";
//components
import Navbar from "./components/Navbar";
import PrivRoute from "./components/PrivRoute";

function App() {
  return (
    <div className="App">
      <h1>firebase test</h1>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/signin" element={<SignInPage />}></Route>
          <Route path="/forgotpass" element={<ForgotPassPage />}></Route>

          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/profile" element={<PrivRoute />}>
            <Route path="/profile" element={<ProfilePage />}></Route>
          </Route>
        </Routes>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;
