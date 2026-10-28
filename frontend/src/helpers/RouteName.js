export const RouteIndex = "/";
export const RouteSignup = "/signup";
export const RouteLogin = "/login";
export const RouteHomepageLayout = "/homepage";
export const RouteProfile = "/homepage/profile";
export const RouteChatLayout = "/chat";
export const RouteCreateRoomModal = "/createRoomModal";
export const RouteForgotPassword = "/forgot-password";
export const RouteResetPassword = (token) => {
    if(token) {
        return `/reset-password/:${token}`
    } else {
        return "/reset-password/:token"
    }
};