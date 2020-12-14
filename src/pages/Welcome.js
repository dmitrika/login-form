import { pages } from '../app'

export function Welcome({ setCurrentPage }) {
  return (
    <main className="paper">
      <h1 className="title">Welcome to your space</h1>
      <button onClick={() => setCurrentPage(pages.login)} className="btn">
        Log out
      </button>
    </main>
  );
}
