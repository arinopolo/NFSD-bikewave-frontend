import React, { useContext, useEffect } from "react";
import mobileBackground from "../assets/mobileBackground.svg";
import WelcomePageContent from "../containers/welcomePageContent/WelcomePageContent";
import Button from "../components/button/Button";
import { AuthContext } from "../contexts/AuthContext";

const WelcomePage = () => {
  const { setPageVisited } = useContext(AuthContext);

  useEffect(() => {
    setPageVisited();
  }, []);
  return (
    <div className="background-image flex flex-column ">
      <WelcomePageContent />
    </div>
  );
};

export default WelcomePage;
