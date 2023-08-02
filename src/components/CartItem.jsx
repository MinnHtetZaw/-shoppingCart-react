import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import StoreItems from "../data/items.json";
import { formatCurrency } from "../utilities/formCurrency";

const CartItem = ({ item }) => {
  const { removeFromCart } = useShoppingCart();
  const filtered = StoreItems.find((i) => i.id === item.id);
  if (filtered.null) return null;

  return (
    <Stack direction="horizontal" gap={2}>
      <img
        src={filtered.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {filtered.name}{" "}
          {item.quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{item.quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{fontSize:".75rem"}}>
            {formatCurrency(filtered.price)}
        </div>
        
      </div>
      <div>
            {formatCurrency(filtered.price * item.quantity)}
        </div>
        <Button variant="outline-danger" size="sm" onClick={()=>removeFromCart(filtered.id)}>&times;</Button>
    </Stack>
  );
};

export default CartItem;
