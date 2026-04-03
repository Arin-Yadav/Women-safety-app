import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import WelcomeScreen from "./components/WelcomeScreen";
import HomePage from "./components/HomePage";
import {
  RouteAbout,
  RouteChatLayout,
  RouteDashboard,
  RouteFeatures,
  RouteHomepage,
  RouteIndex,
  RouteLogin,
  RouteProfile,
  RoutePublicAbout,
  RouteSignup,
  RouteWelcome,
} from "./helpers/RouteName";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ChatLayout from "./components/ChatLayout";
import Profile from "./components/Profile";
import AppShell from "./components/AppShell";
import Dashboard from "./components/Dashboard";
import Aboutus from "./components/Aboutus";
import PublicLayout from "./components/PublicLayout";
import PublicHomePage from "./components/PublicHomePage";
import PublicFeaturesPage from "./components/PublicFeaturesPage";
import PublicAboutPage from "./components/PublicAboutPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path={RouteIndex} element={<PublicHomePage />} />
          <Route path={RouteFeatures} element={<PublicFeaturesPage />} />
          <Route path={RoutePublicAbout} element={<PublicAboutPage />} />
        </Route>

        <Route path={RouteSignup} element={<SignUp />} />
        <Route path={RouteLogin} element={<Login />} />
        <Route path={RouteWelcome} element={<WelcomeScreen />} />

        <Route element={<AppShell />}>
          <Route path={RouteDashboard} element={<Navigate to={RouteHomepage} replace />} />
          <Route path={RouteHomepage} element={<HomePage />} />
          <Route path={RouteChatLayout} element={<ChatLayout />} />
          <Route path={RouteProfile} element={<Profile />} />
          <Route path={RouteAbout} element={<Navigate to={RouteHomepage} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
