import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import Dashboard from "./dashboard/Dashboard"; // Ensure correct casing
import AddRecord from "./AddRecord";
import "./index.css"; // Ensure Tailwind is working
import { persistor, store } from "./store/store";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./provider/AuthProvider";
import ProtectedRoute from "./provider/ProtectedRoute";
import ProfilePage from "./ProfilePage";
import DefaultLayout from "./layouts/default";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found. Ensure index.html has <div id='root'></div>");
}

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
     <PersistGate loading={<div>Loading...</div>} persistor={persistor} debug={true}>
      <AuthProvider>
        <React.StrictMode>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
          <App/>
        </React.StrictMode>
      </AuthProvider>
    </PersistGate>
  </Provider>
);
