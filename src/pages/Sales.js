import React, { useState } from 'react';
import '../styles/Stock.css'

function Sales({ products, setProducts, sales, setSales }) {
    const [selected, setSelected] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('kg');
    const [pricePerKg, setPricePerKg] = useState(''); // New state for price input

    const recordSale = () => {
        if (!selected || !quantity || !pricePerKg) return;
        const index = products.findIndex(p => p.name === selected);
        if (index === -1) return;

        // Convert quantity to grams if unit is kg (assuming products store quantity in grams)
        const quantityInGrams = unit === 'kg' ? quantity * 1000 : quantity;
        
        if (products[index].quantity < quantityInGrams) return;

        // Update stock
        const updated = [...products];
        updated[index].quantity -= parseInt(quantityInGrams);
        setProducts(updated);

        // Calculate total price
        const price = parseFloat(pricePerKg);
        const total = unit === 'kg' 
            ? price * quantity 
            : (price / 1000) * quantity;

        // Add sale record
        setSales([...sales, { 
            product: selected, 
            quantity,
            unit,
            pricePerKg: price, // Store the price per kg used
            total: parseFloat(total.toFixed(2)) // Round to 2 decimal places
        }]);

        // Reset form
        setSelected('');
        setQuantity('');
        setPricePerKg('');
        setUnit('kg');
    };

    const deleteSale = (saleIndex) => {
        const saleToDelete = sales[saleIndex];
        const productIndex = products.findIndex(p => p.name === saleToDelete.product);
        
        if (productIndex !== -1) {
            // Convert quantity back to grams for restoring inventory
            const quantityInGrams = saleToDelete.unit === 'kg' 
                ? saleToDelete.quantity * 1000 
                : saleToDelete.quantity;
            
            const updatedProducts = [...products];
            updatedProducts[productIndex].quantity += parseInt(quantityInGrams);
            setProducts(updatedProducts);
        }
        
        const updatedSales = sales.filter((_, index) => index !== saleIndex);
        setSales(updatedSales);
    };

    return (
        <div>
            <h2>Sales</h2>
            <div className="sales-form">
                <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                    <option value="">Select Products</option>
                    {products.map((p, i) => <option key={i} value={p.name}>{p.name}</option>)}
                </select>
                <input 
                    value={quantity} 
                    type="number" 
                    onChange={(e) => setQuantity(e.target.value)} 
                    placeholder="Quantity" 
                />
                <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                    <option value="kg">kg</option>
                    <option value="grams">grams</option>
                </select>
                <input
                    value={pricePerKg}
                    type="number"
                    onChange={(e) => setPricePerKg(e.target.value)}
                    placeholder="Price per kg"
                />
                <button onClick={recordSale}>Record Sale</button>
            </div>

            <h3>Sales History</h3>
            <table className='custom-tables'>
                {sales.length === 0 ? <p>No sales yet</p> : (
                    <>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price/kg</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map((s, i) => (
                                <tr key={i}>
                                    <td>{s.product}</td>
                                    <td>{s.quantity} {s.unit}</td>
                                    <td>Ksh {s.pricePerKg}</td>
                                    <td>Ksh {s.total}</td>
                                    <td>
                                        <button onClick={() => deleteSale(i)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                )}
            </table>
        </div>
    );
}

export default Sales;
