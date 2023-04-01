import AuthContextProvider from "./context/AuthContextProvider";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthContextProvider>
      <AppRouter />
      <ToastContainer />
    </AuthContextProvider>
  );
}

export default App;