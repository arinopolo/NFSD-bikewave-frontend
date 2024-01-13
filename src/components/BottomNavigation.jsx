import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/BottomNavigation.css";
import {
  faBicycle,
  faHeart,
  faHouse,
  faMessage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const BottomNavigation = () => {
  return (
    <>
      <nav className="bottom-navigation-container">
        <div className="bottom-nav-btn">
          <FontAwesomeIcon icon={faHouse} size="lg" className="icon" />

          <a href="">Inicio</a>
        </div>
        <div className="bottom-nav-btn">
          <FontAwesomeIcon icon={faBicycle} size="lg" className="icon" />
          <a href="">Inicio</a>
        </div>
        <div className="bottom-nav-btn">
          <FontAwesomeIcon icon={faHeart} size="xl" className="icon" />

          <a href="">Favoritos</a>
        </div>
        <div className="bottom-nav-btn">
          <FontAwesomeIcon icon={faMessage} size="lg" className="icon" />

          <a href="">Mensajes</a>
        </div>
        <div className="bottom-nav-btn">
          <FontAwesomeIcon icon={faUser} size="lg" className="icon" />
          <a href="">Perfil</a>
        </div>
      </nav>
    </>
  );
};

export default BottomNavigation;
