import { useCart } from '../context/CartContext.jsx'
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import Popup from './Popup.jsx';

function ProductCard({ id, title, price, image, rating, sectionProducts }) {
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const [animating, setAnimating] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const imgRef = useRef();

  function addToCart(e){
    e.stopPropagation();
    // Check if user is logged in
    const user = localStorage.getItem('auth-user');
    if (!user) {
      setShowPopup(true);
      return;
    }
    dispatch({ type: 'ADD', payload: { id: id || title, title, price, image } });
    setAnimating(true);
    setTimeout(() => setAnimating(false), 700);
  }

  function handleCardClick() {
    if (sectionProducts) {
      try { localStorage.setItem('products', JSON.stringify(sectionProducts)); } catch {}
    }
    navigate(`/product/${id}`);
  }

  return (
    <>
      <div className="product" style={{cursor:'pointer'}} onClick={handleCardClick}>
        <div className="product__image" aria-label={title}>
          {image ? <img ref={imgRef} src={image} alt={title} className={animating ? 'fly-to-cart' : ''} /> : <div className="product__placeholder" />}
        </div>
        <div className="product__body">
          <div className="product__title">{title}</div>
          <div className="product__meta">
            <span className="product__price">₹{price}</span>
            {rating ? <span className="product__rating">★ {rating}</span> : null}
          </div>
          <button className="product__btn" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
      <Popup open={showPopup} message="Please login to add products to cart." onClose={() => setShowPopup(false)} />
    </>
  );
}

export default ProductCard


