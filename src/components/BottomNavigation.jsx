import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/BottomNavigation.css";
import {
  faBicycle,
  faHeart,
  faHouse,
  faMessage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const BottomNavigation = () => {
  return (
    <>
      <nav className="bottom-navigation-container">
        <div className="bottom-nav-btn">
          <Link to="/">
            <FontAwesomeIcon icon={faHouse} size="xl" className="icon" />
            <p>Inicio</p>{" "}
          </Link>
        </div>
        <div className="bottom-nav-btn">
          <FontAwesomeIcon icon={faBicycle} size="lg" className="icon" />
          <a href="">Alquileres</a>
        </div>
        <div className="bottom-nav-btn">
          <FontAwesomeIcon icon={faHeart} size="lg" className="icon" />

          <a href="">Favoritos</a>
        </div>
        <div className="bottom-nav-btn">
          <FontAwesomeIcon icon={faMessage} size="lg" className="icon" />

          <a href="">Mensajes</a>
        </div>
        <div className="bottom-nav-btn">
          <Link to="/login">
            <FontAwesomeIcon icon={faUser} size="xl" className="icon" />
            <p>Perfil</p>{" "}
          </Link>
        </div>
      </nav>
    </>
  );
};

export default BottomNavigation;
