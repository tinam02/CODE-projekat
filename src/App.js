import { Routes, Route, useLocation } from "react-router-dom";
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
import Cursor from "./components/Cursor";
import { AnimatePresence } from "framer-motion";
import ErrorPage from "./pages/ErrorPage";
function App() {
  const location = useLocation();
  return (
    <>
      <Cursor />
      <Navbar />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route
            key={location.pathname}
            path="/"
            element={<HomePage />}
          ></Route>{" "}
          <Route
            key={location.pathname}
            path="/signup"
            element={<SignUpPage />}
          ></Route>
          <Route
            key={location.pathname}
            path="/signin"
            element={<SignInPage />}
          ></Route>{" "}
          <Route
            key={location.pathname}
            path="/profile"
            element={<ProtectedRoute />}
          >
            <Route
              key={location.pathname}
              path="/profile"
              element={<ProfilePage />}
            ></Route>
            {/* ovo je outlet */}
          </Route>
          <Route
            key={location.pathname}
            path="/forgotpass"
            element={<ForgotPassPage />}
          ></Route>{" "}
          <Route
            key={location.pathname}
            path="/submit"
            element={<SubmitImage />}
          ></Route>
          <Route
            key={location.pathname}
            path="/filtered/:filteredBy"
            element={<Filtered />}
          ></Route>
          <Route
            key={location.pathname}
            path="/image/:imageID"
            element={<ImagePage />}
          ></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
