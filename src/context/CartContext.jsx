import { createContext, useContext, useReducer, useCallback } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.cod === action.item.cod);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.cod === action.item.cod ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.item, qty: 1 }] };
    }
    case 'REMOVE_ITEM': {
      const existing = state.items.find((i) => i.cod === action.cod);
      if (existing && existing.qty > 1) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.cod === action.cod ? { ...i, qty: i.qty - 1 } : i
          ),
        };
      }
      return { ...state, items: state.items.filter((i) => i.cod !== action.cod) };
    }
    case 'DELETE_ITEM':
      return { ...state, items: state.items.filter((i) => i.cod !== action.cod) };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

/* Parse "S/ 7.00" → 7.00 */
function parsePrice(priceStr) {
  return parseFloat(priceStr.replace('S/', '').trim());
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = useCallback((item) => dispatch({ type: 'ADD_ITEM', item }), []);
  const removeItem = useCallback((cod) => dispatch({ type: 'REMOVE_ITEM', cod }), []);
  const deleteItem = useCallback((cod) => dispatch({ type: 'DELETE_ITEM', cod }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + parsePrice(i.precio) * i.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{ items: state.items, addItem, removeItem, deleteItem, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
