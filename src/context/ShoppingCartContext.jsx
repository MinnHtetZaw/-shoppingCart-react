import { createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";

const ShoppingCartContext = createContext({});

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export function ShoppingCartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen,setIsOpen]=useState(false)
  
  const cartQuantity = cartItems.reduce((quantity,item)=>item.quantity + quantity,0)

  const openCart=()=>setIsOpen(true)
  const closeCart=()=>setIsOpen(false)

  function getItemQuantity(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id) {
    setCartItems((current) => {
      if (current.find((item) => item.id === id) == null) {
        return [...current, { id, quantity: 1 }];
      } else {
        return current.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(id) {
    setCartItems((current) => {
      if (current.find((item) => item.id === id)?.quantity == 1) {
        return current.filter((item) => item.id !== id);
      } else {
        return current.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id) {
    setCartItems((current) => {
      return current.filter((item) => item.id !== id);
    });
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
       

      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
  );
}
