import React, { useState } from 'react';

const PricingDiscount = () => { 
    const [PricingDetails, setPricingDetails] = useState([]);
    const [newPricing, setNewPricing] = useState({
        itemName:"",
        price: "",
        discount: '',
    });

    const handlePricingChange =(event) => {
        const { name, value } = event.target;
        setNewPricing({ ...newPricing, [name]: value });
    };

    const handlePricingSubmit = (e) => {
        e.preventDefault();
        setPricingDetails([...PricingDetails, newPricing]);
        setNewPricing({ itemName:"", price: "", discount: ''});

    };
return (
    <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className= "text-xl font - bold">
            Pricing and Discount Management
        </h2>
        <form onSumbit={handlePricingSubmit} className="mt-4">
            <input
            type="text"
            name="itemName"
            value={newPricing.itemName}
            onChange={handlePricingChange}
            placeholder="Item Name"
            className="border p-2 rounded mb-4 w-full"
            required
            />
              <input
            type="number"
            name="price"
            value={newPricing.price}
            onChange={handlePricingChange}
            placeholder="Price"
            className="border p-2 rounded mb-4 w-full"
            required
            />
              <input
            type="number"
            name="discount"
            value={newPricing.discount}
            onChange={handlePricingChange}
            placeholder="Discount (%)"
            className="border p-2 rounded mb-4 w-full"
            required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Add Pricing
            </button>

        </form>
        {/* Pricing Table */}
        <h3></h3>
            <table>
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Item Name</th>
                         <th className="border px-4 py-2">Price</th>
                          <th className="border px-4 py-2">Discount (%)</th>
                    </tr>
                </thead>  
           <tbody>
            {PricingDetails.map((pricing, index) => (
                <tr>
                    <td className="border px-4 py-2">{pricing.itemName}</td>
                    <td className="border px-4 py-2">${pricing.price}</td>
                    <td className="border px-4 py-2">{pricing.discount}</td>
                </tr>
            ))}
           </tbody>   
      </table>
    </div>
);

};

export default PricingDiscount;