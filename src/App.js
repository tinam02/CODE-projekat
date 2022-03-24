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
import Cursor from "./components/Cursor";
import { AnimatePresence } from "framer-motion";
import ErrorPage from "./pages/ErrorPage";

function App() {
  // framer
  const location = useLocation();

  // theme
  let colorMode = localStorage.getItem("colorMode");
  const enableColorMode = () => {
    document.body.classList.add("theme2");
    localStorage.setItem("colorMode", "enabled");
  };
  const disableColorMode = () => {
    document.body.classList.remove("theme2");
    localStorage.setItem("colorMode", null);
  };
  if (colorMode === "enabled") {
    enableColorMode();
  }
  const themeToggle = () => {
    colorMode = localStorage.getItem("colorMode");
    if (colorMode !== "enabled") {
      enableColorMode();
    } else {
      disableColorMode();
    }
  };

  return (
    <div>
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
              element={<ProfilePage themeToggle={themeToggle} />}
            ></Route>
            {/*  outlet */}
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
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
