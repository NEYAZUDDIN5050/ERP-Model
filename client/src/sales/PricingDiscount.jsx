import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PricingDiscount = () => {
  const navigate = useNavigate();
  const [pricings, setPricings] = useState([]);
  const [newPricing, setNewPricing] = useState({
    productName: '',
    price: '',
    discountPercentage: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPricings = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/sales/pricings');
        console.log('API response (pricings):', res.data);
        setPricings(Array.isArray(res.data) ? res.data : []);
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching pricings:', err.response?.data || err.message);
        setError('Failed to load pricings. Please check the backend server.');
        setPricings([]);
        setLoading(false);
      }
    };
    fetchPricings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { productName, price } = newPricing;
    if (productName && price) {
      try {
        const res = await axios.post('/api/sales/pricings', {
          ...newPricing,
          price: parseFloat(newPricing.price) || 0,
          discountPercentage: parseFloat(newPricing.discountPercentage) || 0,
        });
        setPricings([...pricings, res.data]);
        setNewPricing({ productName: '', price: '', discountPercentage: '' });
        setError('');
      } catch (err) {
        console.error('Error adding pricing:', err.response?.data || err.message);
        setError('Failed to add pricing. Please check the input or backend server.');
      }
    } else {
      setError('Product Name and Price are required.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPricing({ ...newPricing, [name]: value });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Pricing & Discount</h2>
      <button
        onClick={() => navigate('/sales')}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
      >
        ← Back to Sales
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading pricings...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="productName"
                value={newPricing.productName}
                onChange={handleChange}
                placeholder="Product Name"
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                name="price"
                value={newPricing.price}
                onChange={handleChange}
                placeholder="Price"
                className="border p-2 rounded"
                min="0"
                step="0.01"
                required
              />
              <input
                type="number"
                name="discountPercentage"
                value={newPricing.discountPercentage}
                onChange={handleChange}
                placeholder="Discount Percentage"
                className="border p-2 rounded"
                min="0"
                max="100"
                step="0.01"
              />
            </div>
            <button type="submit" className="bg-green-500 text-white p-2 rounded mt-4">
              Add Pricing
            </button>
          </form>

          <h3 className="text-lg font-bold mt-4">Pricings</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Product Name</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Discount (%)</th>
                <th className="border px-4 py-2">Final Price</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(pricings) && pricings.length > 0 ? (
                pricings.map((pricing) => (
                  <tr key={pricing._id}>
                    <td className="border px-4 py-2">{pricing.productName}</td>
                    <td className="border px-4 py-2">${pricing.price.toFixed(2)}</td>
                    <td className="border px-4 py-2">{pricing.discountPercentage.toFixed(2)}%</td>
                    <td className="border px-4 py-2">
                      ${(pricing.price * (1 - pricing.discountPercentage / 100)).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border px-4 py-2 text-center">
                    No pricings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default PricingDiscount;