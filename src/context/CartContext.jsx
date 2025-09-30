import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { id, title, price, image } = action.payload
      const existing = state.items[id]
      const quantity = existing ? existing.quantity + 1 : 1
      return { ...state, items: { ...state.items, [id]: { id, title, price, image, quantity } } }
    }
    case 'INC': {
      const { id } = action.payload
      const item = state.items[id]
      if (!item) return state
      return { ...state, items: { ...state.items, [id]: { ...item, quantity: item.quantity + 1 } } }
    }
    case 'DEC': {
      const { id } = action.payload
      const item = state.items[id]
      if (!item) return state
      const nextQty = item.quantity - 1
      const nextItems = { ...state.items }
      if (nextQty <= 0) delete nextItems[id]
      else nextItems[id] = { ...item, quantity: nextQty }
      return { ...state, items: nextItems }
    }
    case 'REMOVE': {
      const { id } = action.payload
      const nextItems = { ...state.items }
      delete nextItems[id]
      return { ...state, items: nextItems }
    }
    case 'CLEAR':
      return { items: {} }
    case 'HYDRATE':
      return action.payload
    default:
      return state
  }
}

const initialState = { items: {} }

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart-state')
      if (raw) dispatch({ type: 'HYDRATE', payload: JSON.parse(raw) })
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    try { localStorage.setItem('cart-state', JSON.stringify(state)) } catch {}
  }, [state])

  const summary = useMemo(() => {
    const entries = Object.values(state.items)
    const subtotal = entries.reduce((sum, it) => sum + it.price * it.quantity, 0)
    const tax = +(subtotal * 0.18).toFixed(2)
    const shipping = subtotal > 0 ? 49 : 0
    const total = +(subtotal + tax + shipping).toFixed(2)
    const totalItems = entries.reduce((sum, it) => sum + it.quantity, 0)
    return { subtotal, tax, shipping, total, totalItems }
  }, [state])

  const value = useMemo(() => ({ state, dispatch, summary }), [state, summary])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}


