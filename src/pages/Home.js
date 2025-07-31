import '../styles/Home.css'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='home'>
      <div className='home-content'>
        <h1 className='home-title'>Welcome to Cereals Store Management</h1>
        <p className='home-p'>Manage cereals, stock, and sales with ease.</p>
      </div>
      <div className='pro-btn'>
        <Link to="/products" className='products-btn'>Navigate to Products</Link>
      </div>
    </div>
  );
}

export default Home;
