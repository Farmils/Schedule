import { MainPage } from "../../ui/pages/mainPage/MainPage.tsx";
import { ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProfilePage } from "../../ui/pages/profilePage/ProfilePage.tsx";
import { SchedulePage } from "../../ui/pages/schedulePage/SchedulePage.tsx";
import { PresencePage } from "../../ui/pages/presencePage/PresencePage.tsx";

type Route = {
  path: string;
  element: ReactNode;
};
const routes: Route[] = [
  { path: "/", element: <MainPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/schedule", element: <SchedulePage /> },
  { path: "/presence", element: <PresencePage /> },
];

const router = createBrowserRouter(routes);
export { router };
