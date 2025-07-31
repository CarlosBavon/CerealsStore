import React, { useState } from 'react';

function ProductForm({ addProduct }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('g');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !quantity) return;

    // Convert to grams if input is in kg
    const quantityInGrams = unit === 'kg'
      ? parseFloat(quantity) * 1000
      : parseFloat(quantity);

    addProduct({
      name,
      quantity: quantityInGrams,
    });

    // Reset form
    setName('');
    setQuantity('');
    setUnit('g');

  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Cereal Name"
      />
      
      <input
        value={quantity}
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
      />
      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="g">grams</option>
        <option value="kg">kilograms</option>
      </select>

      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;
