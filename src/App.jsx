import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TarotCards from "./TarotCards";
import EditCard from "./pages/EditCard.jsx";
import CreateCard from "./pages/CreateCard.jsx";
import ViewCard from "./pages/ViewCard.jsx";

const App = () => {
    return (
        <Router>
            {/*Navbar - Alleen basis links vinden zich hier plaats.*/}
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-gray-200 flex flex-col items-center p-6">
                <nav className="bg-gray-800 bg-opacity-90 p-4 rounded-lg shadow-lg flex gap-4 text-lg m-4">
                    <Link to="/" className="text-yellow-400 hover:text-yellow-300 transition">Home</Link>
                    <span className="text-gray-500">|</span>
                    <Link to="/tarots" className="text-yellow-400 hover:text-yellow-300 transition">Tarot Cards</Link>
                    <span className="text-gray-500">|</span>
                    <Link to="/tarots/create" className="text-yellow-400 hover:text-yellow-300 transition">Create A Card</Link>
                </nav>

                    <Routes>
                        {/*Routes voor de hele pagina, met gebruik van React - Router*/}
                        <Route path="/" element={<h1 className="text-center text-4xl font-bold text-yellow-300">Welcome to the Tarot Haven.</h1>} />
                        <Route path="/tarots" element={<TarotCards />} />
                        <Route path="/tarots/:id/view" element={<ViewCard />} />
                        <Route path="/tarots/:id/edit" element={<EditCard />} />
                        <Route path="/tarots/create" element={<CreateCard />} />
                    </Routes>
            </div>
        </Router>
    );
};

export default App;
