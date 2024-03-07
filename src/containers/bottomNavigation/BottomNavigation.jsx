import {
  faCirclePlus,
  faHeart,
  faHouse,
  faMessage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import NavigationItem from "../../components/navigation/NavigationItem";
import "./BottomNavigation.css";

const BottomNavigation = () => {
  return (
    <>
      <nav className="bottom-navigation-container">
        <NavigationItem link="/" text="Inicio" icon={faHouse} />
        <NavigationItem link="/favorites" text="Favoritos" icon={faHeart} />
        <NavigationItem
          link="/list-item"
          text="Ofrece tu bici"
          icon={faCirclePlus}
        />
        <NavigationItem link="/chats" text="Mensajes" icon={faMessage} />
        <NavigationItem link="/profile" text="Perfil" icon={faUser} />
      </nav>
    </>
  );
};

export default BottomNavigation;
