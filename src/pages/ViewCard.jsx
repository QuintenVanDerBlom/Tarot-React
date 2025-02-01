import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ViewCard() {
    //Simpel, haal alle data op en laat het zien.
    const { id } = useParams();
    const [cardData, setCardData] = useState(null);

    useEffect(() => {
        fetch(`http://145.24.223.42:8001/tarots/${id}`, {
            headers: { 'Accept': 'application/json' }
        })
            .then(response => response.json())
            .then(data => setCardData(data))
            .catch(error => console.error('Error fetching card data:', error));
    }, [id]);

    if (!cardData) {
        return <div className="text-center text-gray-700">Loading...</div>;
    }

    return (
        <div className="max-w-lg mx-auto bg-gray-900 text-gray-100 shadow-lg rounded-lg p-6 border border-yellow-500">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4 text-center">{cardData.title}</h2>
            {cardData.image_url && (
                <div className="mb-4 flex justify-center">
                    <img src={cardData.image_url} alt={cardData.title} className="w-48 h-64 object-cover rounded-lg shadow-md border border-yellow-500" />
                </div>
            )}
            <p className="text-lg mb-2"><span className="font-bold text-yellow-300">Arcana:</span> {cardData.arcana}</p>
            {cardData.suit && <p className="text-lg mb-2"><span className="font-bold text-yellow-300">Suit:</span> {cardData.suit}</p>}
            {cardData.number && <p className="text-lg mb-2"><span className="font-bold text-yellow-300">Number:</span> {cardData.number}</p>}
            <p className="text-lg mt-4"><span className="font-bold text-yellow-300">Description:</span> {cardData.description}</p>
        </div>
    );
}

export default ViewCard;
