import { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// 🛡 Custom context name & default state
export const AuthContext = createContext({
  loggedIn: false,
  user: null,
});

// 💡 AppProvider replaces AppWrapper
const AppProvider = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        userInfo,
        setUserInfo,
      }}
    >
      <App />
    </AuthContext.Provider>
  );
};

// 🚀 Mounting app to root
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider />
  </StrictMode>
);
