import { useState } from "react";

import { Login } from "./pages/login";
import { Welcome } from "./pages/welcome";

export const pages = { login: "login", welcome: "welcome" };

export default function App({ API }) {
  const [currentPage, setCurrentPage] = useState(pages.login);

  return (
    <>
      {currentPage === pages.login && (
        <Login API={API} setCurrentPage={setCurrentPage} />
      )}
      {currentPage === pages.welcome && (
        <Welcome setCurrentPage={setCurrentPage} />
      )}
    </>
  );
}
