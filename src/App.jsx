import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const data = localStorage.getItem("currentUser");
    return data ? JSON.parse(data) : null;
  });

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);
  const [userInfo, setUserInfo] = useState(() => {
    const data = localStorage.getItem("users");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(userInfo));
  }, [userInfo]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/Login"
            element={
              <LoginPage
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/Register"
            element={
              <RegisterPage userInfo={userInfo} setUserInfo={setUserInfo} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
