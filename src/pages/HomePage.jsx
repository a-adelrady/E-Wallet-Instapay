import { Navigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import MainHeader from "../components/MainHeader";

export default function HomePage({
  userInfo,
  setUserInfo,
  currentUser,
  setCurrentUser,
}) {
  if (!currentUser) {
    return <Navigate to="/Login" />;
  }
  return (
    <>
      <MainHeader
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <HeroSection
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </>
  );
}
