import LandingPage from "./components/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomeScreen from "./components/WelcomeScreen";
import HomePage from "./components/HomePage";
import {
  RouteChatLayout,
  RouteHomepage,
  RouteIndex,
  RouteLogin,
  RouteSignup,
  RouteWelcome,
} from "./helpers/RouteName";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ChatLayout from "./components/ChatLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<LandingPage />} />
        <Route path={RouteSignup} element={<SignUp />} />
        <Route path={RouteLogin} element={<Login />} />
        <Route path={RouteWelcome} element={<WelcomeScreen />} />
        <Route path={RouteHomepage} element={<HomePage />} />
        <Route path={RouteChatLayout} element={<ChatLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
