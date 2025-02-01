import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TarotCardItem = ({ card, onDelete }) => {
    //Navigate voor seamless navigeren.
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        try {
            //Delete vindt zich plaats in het item zelf, dit leek mij handiger.
            const response = await fetch(`http://145.24.223.42:8001/tarots/${card.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            if (response.ok) {
                //Als de delete goed is, haal de modal weg en fuur onDelete af zodat alle tarot cards weer opgehaald worden zonder een manual refresh.
                setShowModal(false);
                onDelete();
            } else {
                console.error("Failed to delete the card");
            }
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    return (
        <div className="bg-gray-800 bg-opacity-80 border border-yellow-400 p-6 rounded-xl shadow-xl text-gray-200 w-200 h-max">
            <h2 className="text-2xl font-bold text-yellow-300">{card.title}</h2>
            <img src={card.image_url} alt={card.title} className="w-full h-max object-cover rounded-md my-4 border border-yellow-500"/>
            <p className="text-gray-400">{card.description}</p>
            <p className="text-lg font-semibold text-yellow-300 mt-2">{card.arcana}</p>
            <div className="flex gap-3 mt-6">
                {/*Buttons voor elk item met het unieke ID. Dit kan ook gebruikt worden voor direct linken.*/}
                <button onClick={() => navigate(`${card.id}/view`)} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">View</button>
                <button onClick={() => navigate(`${card.id}/edit`)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Edit</button>
                <button onClick={() => setShowModal(true)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">Delete</button>
            </div>

            {/*Delete Modaltje */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-yellow-500 text-gray-200">
                        <p className="mb-4 text-lg">Are you sure you wish to delete this Tarot?</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowModal(false)} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg">Cancel</button>
                            <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TarotCardItem;
