import LogoComponent from "../components/LogoComponent";
import BottomNavigation from "../components/BottomNavigation";
import ListItemForm from "../components/ListItemForm";

const ListItemPage = ({ token }) => {
  return (
    <div className="login-page-container">
      <LogoComponent />

      <ListItemForm token={token} />
      <BottomNavigation />
    </div>
  );
};

export default ListItemPage;
