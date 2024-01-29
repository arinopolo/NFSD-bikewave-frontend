import "./App.css";

import AppRoutes from "./components/AppRouter";
import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <AppRoutes />
    </AuthContextProvider>
  );
}

export default App;
