import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmAlta from "./app/pages/emAlta";
import InitialPage from "./app/pages/initialPage";
import { Biblioteca } from "./app/pages/Biblioteca";
import Layout from "./app/components/layout";
import ArtistPage from "./app/pages/Artist";
import ArtistRegistrationPage from "./app/pages/ArtistRegistration";
import SearchPage from "./app/pages/Busca";
import ListTests from "./app/pages/ListTests";
import CreateTest from "./app/pages/CreateTest";
import Cadastro from "./app/pages/Album";

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
