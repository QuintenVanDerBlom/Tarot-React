import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateTarot() {
    //Navigate + Usestate
    const navigate = useNavigate();
    const [cardData, setCardData] = useState({ title: '', description: '', arcana: '', suit: '', number: '', image_url: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardData(prevState => ({
            //Check of het een nummer is. Issue is al opgelost in backend.
            ...prevState,
            [name]: name === "number" ? (value ? parseInt(value, 10) : "") : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!cardData.title || !cardData.description || !cardData.arcana) {
            alert("Title, Description, and Arcana are required!");
            return;
        }
        fetch('http://145.24.223.42:8001/tarots', {
            //Standaard post, Accept header etc.
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                ...cardData,
                number: cardData.number !== "" ? cardData.number : null,
                suit: cardData.suit || null
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Card created successfully:', data);
                navigate('/tarots');
            })
            .catch(error => console.error('Error creating card:', error));
    };

    return (
        <div className="max-w-lg mx-auto bg-gray-800 bg-opacity-90 shadow-xl rounded-xl p-6 mt-6 border border-yellow-400">
            <h2 className="text-3xl font-bold text-center text-yellow-300 mb-6">Create a New Tarot Card</h2>
            {/*Nieuwe manier van een form maken, was leuk om uit te proberen en werkt ook.*/}
            <form onSubmit={handleSubmit}>
                {[
                    { label: "Title", name: "title", type: "text", required: true },
                    { label: "Description", name: "description", type: "textarea", required: true },
                    { label: "Arcana", name: "arcana", type: "select", options: ["Major", "Minor"], required: true },
                    { label: "Suit", name: "suit", type: "text" },
                    { label: "Number", name: "number", type: "number" },
                    { label: "Image URL", name: "image_url", type: "text" }
                ].map(({ label, name, type, options, required }) => (
                    <div className="mb-4" key={name}>
                        <label className="block text-sm font-medium text-yellow-300" htmlFor={name}>{label} {required && <span className="text-red-500">*</span>}</label>
                        {type === "textarea" ? (
                            <textarea id={name} name={name} value={cardData[name]} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-yellow-500 rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm" required={required} />
                        ) : type === "select" ? (
                            <select id={name} name={name} value={cardData[name]} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-yellow-500 rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm" required={required}>
                                <option value="">Select {label}</option>
                                {options.map(option => <option key={option} value={option}>{option} Arcana</option>)}
                            </select>
                        ) : (
                            <input type={type} id={name} name={name} value={cardData[name]} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-yellow-500 rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm" required={required} />
                        )}
                    </div>
                ))}
                <div className="flex justify-center">
                    <button type="submit" className="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300">Create Tarot Card</button>
                </div>
            </form>
        </div>
    );
}

export default CreateTarot;
