import React from 'react';
import '../styles/Stock.css'

function Stock({ products, setProducts }) {
  const updateStock = (index, amount) => {
    const updated = [...products];
    updated[index].quantity += amount;
    setProducts(updated);
  };

  return (
    <table className='custom-tables'>
      <h2>Stock Management</h2>
      {products.length === 0 ? <p>No products available</p> : (
        <ul className='stocklist'>
          <thead>
            <tr>
              <th>Name</th><th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td>              
                <td>{p.quantity >= 1000
                  ? `${p.quantity / 1000} kg`
                  : `${p.quantity} g`}
                  <button onClick={() => updateStock(i, 100)} className='add-btn'>+100g</button>
                  <button onClick={() => updateStock(i, -100)} disabled={p.quantity <= 0} className='add-btn'>-100g</button>
                </td>
              </tr>
            ))}
          </tbody>
        </ul>
      )}
    </table>
  );
}

export default Stock;
