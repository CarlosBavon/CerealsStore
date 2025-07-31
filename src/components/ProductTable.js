import React from 'react';
import '../styles/Table.css';

function ProductTable({ products, deleteProduct }) {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>Name</th><th>Quantity</th><th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr><td colSpan="4">No products added</td></tr>
        ) : (
          products.map((p, i) => (
            <tr key={i}>
              <td>{p.name}</td>
              <td>
                {p.quantity >= 1000
                  ? `${p.quantity / 1000} kg`
                  : `${p.quantity} g`}
              </td>
              <td><button onClick={() => deleteProduct(i)}>Delete</button></td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default ProductTable;
