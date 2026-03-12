import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
    route("update-profile", "routes/update-profile.tsx"),
    route("update-password", "routes/update-password.tsx"),
    route("register", "routes/register.tsx"),
] satisfies RouteConfig;