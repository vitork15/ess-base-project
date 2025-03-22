import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmAlta from "./app/pages/emAlta";
import InitialPage from "./app/pages/initialPage";
import { Biblioteca } from "./app/pages/Biblioteca";
import Layout from "./app/components/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Define o Layout como container das páginas
    children: [
      { index: true, element: <InitialPage /> }, // Página inicial
      { path: "home", element: <InitialPage /> },
      { path: "biblioteca", element: <Biblioteca /> },
      { path: "emAlta", element: <EmAlta /> },
    ],
  },
]);

export default function App() {
  return (
  <div>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
  </div>
  );
}
