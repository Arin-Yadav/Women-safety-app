import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import {
  RouteChatLayout,
  RouteCreateRoomModal,
  RouteForgotPassword,
  RouteHomepageLayout,
  RouteIndex,
  RouteLogin,
  RouteProfile,
  RouteResetPassword,
  RouteSignup,
} from "./helpers/RouteName";
import LandingPage from "./components/LandingPage";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Home = lazy(() => import("./pages/Home"));
const HomePageLayout = lazy(() => import("./layout/HomePageLayout"));
const CreateRoomModal = lazy(() => import("./components/CreateRoomModal"));
const ChatLayout = lazy(() => import("./Layout/ChatLayout"));
const Profile = lazy(() => import("./components/Profile"));
const ResetPassword = lazy(() => import("./components/ResetPassword"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<LandingPage />} />

        <Route path={RouteChatLayout} element={<ChatLayout />}></Route>
        <Route path={RouteHomepageLayout} element={<HomePageLayout />}>
          <Route index element={<Home />} />
          <Route path={RouteProfile} element={<Profile />} />
        </Route>

        <Route path={RouteSignup} element={<SignUp />} />
        <Route path={RouteLogin} element={<Login />} />
        <Route path={RouteCreateRoomModal} element={<CreateRoomModal />} />
        <Route path={RouteForgotPassword} element={<ForgotPassword />} />
        <Route path={RouteResetPassword()} element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
