import "./App.css"
import Navbar from "./nav.jsx";
import { supabase } from "./Info.jsx";
import { useNavigate } from "react-router-dom";
import {useMessage} from "./mess.jsx";


function Car({ removeIt, totalP, cart, incQu, decQu }) {
  const { showMessage } = useMessage();

  const navigate = useNavigate();
  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      showMessage("Cart is empty", "error");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      showMessage("Please login to place an order","error");
      navigate("/mylogin");
      return;
    }
    

    const { data, error } = await supabase.from('orders').insert({
      user_email: user.email,
      item: cart,
      total: totalP,
      status: 'pending'
    });
  

    if (error) {
      showMessage("Order failed: " + error.message);

    } else {
      showMessage("Order placed successfully!","successful");
      navigate("/");
    }
  };


  return (
    <>
      <Navbar />

      <div className="box">
        <button className="cancel" onClick={() => navigate('/')}>X</button>
        <p>Item in cart: {cart.length}</p><br />
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {cart.map((item, index) => {
              return (
                <div key={item.id + '-' + index} className="remDiv">
                  <img src={item.image} alt="proImg" />
                  <div className="itemInfo">
                    <span>{item.name} - ₹{item.price}</span>
                    <div className="qtyControls">
                      <button onClick={() => decQu(item.id)}>-</button>
                      <span> {item.quantity} </span>
                      <button onClick={() => incQu(item.id)}>+</button>
                    </div>
                  </div>
                  <button className="removeBtn" onClick={() => removeIt(index)}>Remove</button>
                </div>
              )
            })}
            <h3>Total Price: {totalP}</h3>
            <button className="addB" onClick={() => navigate("/checkout")}>
              Place Order
            </button>
            
            {/*onClick={handlePlaceOrder}*/}
          </>
        )}
      </div>
    </>

  )
}

export default Car;
