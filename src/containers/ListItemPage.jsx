import LogoComponent from "../components/LogoComponent";
import BottomNavigation from "../components/BottomNavigation";
import ListItemForm from "../components/ListItemForm";

const ListItemPage = () => {
  return (
    <div className="login-page-container">
      <LogoComponent />

      <ListItemForm />
      <BottomNavigation />
    </div>
  );
};

export default ListItemPage;
