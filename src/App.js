import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookManagement from './BookManagement';

function App() {
    return (
        <Router>
            <nav>
                <Link to="/books">Gestion des livres</Link>
            </nav>
            <Routes>
                <Route path="/books" element={<BookManagement />} />
                <Route path="/" element={<div>Bienvenue sur la page d'accueil</div>} />
            </Routes>
        </Router>
    );
}

export default App;