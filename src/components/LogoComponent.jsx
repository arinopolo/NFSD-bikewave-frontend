import bikewaveLogo from "../assets/logo_bikewave.svg";
import "../App.css";

const LogoComponent = () => {
  return (
    <img src={bikewaveLogo} className="logo-bikewave" alt="Bikewave logo" />
  );
};

export default LogoComponent;
