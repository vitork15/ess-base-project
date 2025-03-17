import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTest from "./app/pages/CreateTest";
import ListTests from "./app/pages/ListTests";
import InitialPage from "./app/pages/initialPage";
import Sidebar from "./app/components/sidebar";
import styles from "./mainLayout.module.css";
import { Biblioteca } from "./app/pages/Biblioteca";

const router = createBrowserRouter([
  {
    path: "*",
    Component: InitialPage,
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
  }
]);

export default function App() {
  return (
  <div className={styles.mainLayout}>
    <div>
      <Sidebar />      
    </div>
    <div>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </div>
  </div>
  );
}
