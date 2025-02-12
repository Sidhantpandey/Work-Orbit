import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/user.context";


const App = () => {
  return (
    <div>
      <ToastContainer />
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </div>
  );
};

export default App;
