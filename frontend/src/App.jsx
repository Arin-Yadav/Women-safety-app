import LandingPage from "./components/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomeScreen from "./components/WelcomeScreen";
import HomePage from "./components/HomePage";
import {
  RouteChatLayout,
  RouteCreateRoomModal,
  RouteHomepage,
  RouteIndex,
  RouteLogin,
  RouteProfile,
  RouteSignup,
  RouteWelcome,
} from "./helpers/RouteName";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ChatLayout from "./components/ChatLayout";
import Profile from "./components/Profile";
import CreateRoomModal from "./components/CreateRoomModal";

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
        <Route path={RouteProfile} element={<Profile />} />
        <Route path={RouteCreateRoomModal} element={<CreateRoomModal />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
