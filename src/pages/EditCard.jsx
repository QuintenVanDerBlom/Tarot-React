import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditTarot() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cardData, setCardData] = useState({
        //Creer de template.
        title: '',
        description: '',
        arcana: '',
        suit: '',
        number: '',
        image_url: ''
    });

    useEffect(() => {
        fetch(`http://145.24.223.42:8001/tarots/${id}`, {
            headers: { 'Accept': 'application/json' }
        })
            .then(response => response.json())
            .then(data => setCardData({
                //Set data, als er geen data is, maak een lege string.
                title: data.title || '',
                description: data.description || '',
                arcana: data.arcana || '',
                suit: data.suit || '',
                number: data.number || '',
                image_url: data.image_url || ''
            }))
            .catch(error => console.error('Error fetching card data:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!cardData.title || !cardData.description || !cardData.arcana) {
            alert("Title, Description, and Arcana are required!");
            return;
        }
        fetch(`http://145.24.223.42:8001/tarots/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(cardData),
        })
            .then(response => response.json())
            .then(data => { console.log('Card updated successfully:', data);
                navigate('/tarots');})
            .catch(error => console.error('Error updating card data:', error));
    };

    return (
        <div className="max-w-md mx-auto bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-lg rounded-lg p-6 border border-gray-700">
            <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">Edit Tarot Card</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium" htmlFor="title">Title *</label>
                    <input type="text" id="title" name="title" value={cardData.title} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:ring-2 focus:ring-yellow-500" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium" htmlFor="arcana">Arcana *</label>
                    <select id="arcana" name="arcana" value={cardData.arcana} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:ring-2 focus:ring-yellow-500">
                        <option value="">Select Arcana</option>
                        <option value="Major">Major Arcana</option>
                        <option value="Minor">Minor Arcana</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium" htmlFor="suit">Suit</label>
                    <input type="text" id="suit" name="suit" value={cardData.suit} onChange={handleChange} className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:ring-2 focus:ring-yellow-500" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium" htmlFor="number">Number</label>
                    <input type="number" id="number" name="number" value={cardData.number} onChange={handleChange} className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:ring-2 focus:ring-yellow-500" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium" htmlFor="description">Description *</label>
                    <textarea id="description" name="description" value={cardData.description} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:ring-2 focus:ring-yellow-500"></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium" htmlFor="image_url">Image URL</label>
                    <input type="text" id="image_url" name="image_url" value={cardData.image_url} onChange={handleChange} className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:ring-2 focus:ring-yellow-500" />
                </div>
                {cardData.image_url && (
                    <div className="mb-4 flex justify-center">
                        <img src={cardData.image_url} alt="Tarot Card" className="w-32 h-48 object-cover rounded-md border border-yellow-500 shadow-md" />
                    </div>
                )}
                <div className="flex justify-center">
                    <button type="submit" className="py-2 px-6 bg-yellow-500 text-gray-900 font-bold rounded-lg shadow-md hover:bg-yellow-400 focus:ring-2 focus:ring-yellow-300">Save Changes</button>
                </div>
            </form>
        </div>
    );
}

export default EditTarot;
