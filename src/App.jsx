import { useState } from 'react';
import jewelleryData from './data/jewelleryData';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Categories from './pages/Categories';
import './index.css';

function App() {
  const [page, setPage] = useState('home');
  const categories = jewelleryData.categories;
  const visibleCategories = categories.filter((category) => category.images?.length > 0);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">Jewellery Exhibition</div>
        <nav className="nav-bar">
          <button className="nav-link" onClick={() => setPage('home')}>
            Home
          </button>
          <button className="nav-link" onClick={() => setPage('about')}>
            About
          </button>
          <button className="nav-link" onClick={() => setPage('contact')}>
            Contact
          </button>
          <button className="nav-link" onClick={() => setPage('categories')}>
            Categories
          </button>
        </nav>
      </header>

      <main className="page-body">
        {page === 'home' && <Home onNavigate={setPage} />}
        {page === 'categories' && <Categories categories={visibleCategories} />}
        {page === 'about' && <About />}
        {page === 'contact' && <Contact />}
      </main>

      <footer className="page-footer">
        <p>© 2026 Jewellery Exhibition. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
