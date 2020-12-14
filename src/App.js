import { useState } from 'react'

import { Login } from './pages/Login'
import { Welcome } from './pages/Welcome'

export const pages = { login: 'login', welcome: 'welcome' }

function App({ API }) {
  const [currentPage, setCurrentPage] = useState(pages.login)
  return (
    <>
      {currentPage === pages.login && <Login API={API} setCurrentPage={setCurrentPage} />}
      {currentPage === pages.welcome && <Welcome setCurrentPage={setCurrentPage} />}
    </>
  );
}

export default App;
