import PageHero from '../components/PageHero.jsx'
import { useCart } from '../context/CartContext.jsx'

function Cart(){
  const { state, dispatch, summary } = useCart()
  const items = Object.values(state.items)

  return (
    <div>
      <PageHero title="Your Cart" subtitle="Items you plan to buy" />
      {items.length === 0 ? (
        <div className="hero">Your cart is empty. Start adding products!</div>
      ) : (
        <div className="cart">
          <div className="cart__items">
            {items.map((it) => (
              <div className="cart__row" key={it.id}>
                <img className="cart__img" src={it.image} alt={it.title} />
                <div className="cart__info">
                  <div className="cart__title">{it.title}</div>
                  <div className="cart__price">₹{it.price}</div>
                  <div className="cart__qty">
                    <button onClick={()=>dispatch({ type:'DEC', payload:{ id: it.id }})}>-</button>
                    <span>{it.quantity}</span>
                    <button onClick={()=>dispatch({ type:'INC', payload:{ id: it.id }})}>+</button>
                    <button className="linklike" onClick={()=>dispatch({ type:'REMOVE', payload:{ id: it.id }})}>Remove</button>
                  </div>
                </div>
                <div className="cart__line">₹{(it.price * it.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <aside className="cart__summary">
            <h3>Order Summary</h3>
            <div className="cart__sumrow"><span>Items</span><span>{summary.totalItems}</span></div>
            <div className="cart__sumrow"><span>Subtotal</span><span>₹{summary.subtotal.toFixed(2)}</span></div>
            <div className="cart__sumrow"><span>Tax (18%)</span><span>₹{summary.tax.toFixed(2)}</span></div>
            <div className="cart__sumrow"><span>Shipping</span><span>₹{summary.shipping.toFixed(2)}</span></div>
            <div className="cart__sumrow cart__sumrow--total"><span>Total</span><span>₹{summary.total.toFixed(2)}</span></div>
            <button className="cart__order">Place Order</button>
            <button className="linklike" onClick={()=>dispatch({ type:'CLEAR' })}>Clear cart</button>
          </aside>
        </div>
      )}
    </div>
  )
}
export default Cart


