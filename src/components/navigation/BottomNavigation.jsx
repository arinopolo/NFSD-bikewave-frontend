import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/BottomNavigation.css";
import {
  faBicycle,
  faCircle,
  faCirclePlus,
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
            <p>Inicio</p>
          </Link>
        </div>

        <div className="bottom-nav-btn">
          <Link to="/favorites">
            <FontAwesomeIcon icon={faHeart} size="xl" className="icon" />
            <p>Favoritos</p>
          </Link>
         
        </div>
        <div className="bottom-nav-btn">
          <Link to="/list-item">
            <FontAwesomeIcon icon={faCirclePlus} size="xl" className="icon" />
            <p>Alquilar </p>
          </Link>
        </div>
        <div className="bottom-nav-btn">
          <FontAwesomeIcon icon={faMessage} size="lg" className="icon" />

          <a href="">Mensajes</a>
        </div>
        <div className="bottom-nav-btn">
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} size="xl" className="icon" />
            <p>Perfil</p>{" "}
          </Link>
        </div>
      </nav>
    </>
  );
};

export default BottomNavigation;
