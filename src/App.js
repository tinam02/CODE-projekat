import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//pages
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPassPage from "./pages/ForgotPassPage";
import Filtered from "./pages/Filtered";
import SubmitImage from "./pages/SubmitImage";
//components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ImagePage from "./pages/ImagePage";

function App() {
  return (
    <div className="App">
      <Router>
        {" "}
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>{" "}
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/signin" element={<SignInPage />}></Route>{" "}
          <Route path="/profile" element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />}></Route>
            {/* ovo je outlet */}
          </Route>
          <Route path="/forgotpass" element={<ForgotPassPage />}></Route>{" "}
          <Route path="/submit" element={<SubmitImage />}></Route>
          <Route path="/filtered/:filteredBy" element={<Filtered />}></Route>
          <Route path="/image/:imageID" element={<ImagePage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
