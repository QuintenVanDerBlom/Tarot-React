import { useEffect, useState } from "react";
import TarotCardItem from "./items/TarotCard";

const TarotCards = () => {
    // Use states zoals geleerd in de les.
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCards = () => {
        // Standaard fetch, Accept header is altijd nodig.
        setLoading(true);
        fetch("http://145.24.223.42:8001/tarots", {
            method: 'GET',
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => {
                //Standaard error handling, meer is niet nodig.
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then((data) => {
                //Vul Use state
                setCards(data.items);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };
    useEffect(() => {
        fetchCards();
    }, []);
    // Voor slomere connecties of grote fetches.
    if (loading) return <div className="text-center text-xl p-4 text-yellow-300">Loading...</div>;
    if (error)
        return <div className="text-center text-red-500 p-4">Error: {error}</div>;

    return (
        <div className="w-9/12 p-6 bg-gray-800 bg-opacity-80 rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold text-center text-yellow-300 mb-6">Tarot Cards</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full max-w-none">
                {cards.map((card) => (
                    // Laad het specifieke item in met onDelete voor refresh op delete.
                    <TarotCardItem key={card.id} card={card} onDelete={fetchCards}/>
                ))}
            </div>
        </div>
    );
};

export default TarotCards;
