import { ReactNode } from "react";
import { HomeProvider } from "./app/context/HomeContext";

const Provider = ({ children }: { children: ReactNode }) => {
  return <HomeProvider>{children}</HomeProvider>;
};

export default Provider;
