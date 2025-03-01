import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/user.context";
import { ThemeProvider } from "./context/theme.context";

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <ToastContainer />
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;