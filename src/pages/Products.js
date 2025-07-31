import React from 'react';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';

function Products({ products, setProducts }) {
  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const deleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Products</h2>
      <ProductForm addProduct={addProduct} />
      <ProductTable products={products} deleteProduct={deleteProduct} />
    </div>
  );
}

export default Products;
