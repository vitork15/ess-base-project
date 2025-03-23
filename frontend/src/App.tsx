import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmAlta from "./app/pages/emAlta";
import InitialPage from "./app/pages/initialPage";
import { Biblioteca } from "./app/pages/Biblioteca";
import Layout from "./app/components/layout";
import LayoutLogin from "./app/components/layoutLogin";
import ArtistPage from "./app/pages/Artist";
import ArtistRegistrationPage from "./app/pages/ArtistRegistration";
import SearchPage from "./app/pages/Busca";
import ListTests from "./app/pages/ListTests";
import CreateTest from "./app/pages/CreateTest";
import Cadastro from "./app/pages/Album";
import LoginPage from "./app/pages/Login"
import RegisterPage from "./app/pages/UserRegistration";
import RecoveryPage from "./app/pages/passwordRecovery";
import PasswordChangePage from "./app/pages/passwordChange";
import UserPage from "./app/pages/User";
import EditPage from "./app/pages/UserEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Define o Layout como container das páginas
    children: [
      { index: true, element: <InitialPage /> }, // Página inicial
      { path: "home", element: <InitialPage /> },
      { path: "biblioteca", element: <Biblioteca /> },
      { path: "emAlta", element: <EmAlta /> },
      { path: "search", element: <SearchPage />},
      { path: "/users/:login", element: <UserPage />},
      { path: "/edit", element: <EditPage />},
    ],
  },
  {
    path: "/",
    element: <LayoutLogin />,
    children: [
      { path: "login", element: <LoginPage />},
      { path: "register", element: <RegisterPage />},
      { path: "recovery", element: <RecoveryPage />},
      { path: "changepassword/:token", element: <PasswordChangePage />}
    ],
  },
  {
    path: "/home",
    Component: InitialPage,
  },
  {
    path: "/create-test",
    Component: CreateTest,
  },
  {
    path: "/tests",
    Component: ListTests,
  },
  {
    path: "/biblioteca",
    Component: Biblioteca
  },
  {
    path: "/artists/:login",
    Component: ArtistPage
  },
  {
    path: "/artistregistration",
    Component: ArtistRegistrationPage
  },
  {
    path: "/search",
    Component: SearchPage
  },
  {
    path: "/albumregister",
    Component: Cadastro
  }
]);

export default function App() {
  return (
  <div>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
  </div>
  );
}
