import { useState } from "react";
import { supabase, useAuth } from "./Info.jsx";
import Navbar from "./nav.jsx"
import "./App.css";
import {useMessage} from "./mess.jsx";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, totalP , setCart}) {
  const { user } = useAuth();
  const { showMessage } = useMessage();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();
  const placeOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      showMessage("Please login first","error");
      return;
    }

    if (!name || !phone || !address) {
      showMessage("Please fill all delivery details ","error");

      return;
    }

    if (cart.length === 0) {
      showMessage("Your cart is empty ","error");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("orders_user")
      .insert({
        user_email: user.email,
        item: cart,
        total_amount: totalP,
        customer_name: name,
        phone: phone,
        address: address,
        payment_method: paymentMethod,
        payment_status: "pending",
        order_status: "placed",
      })
      .select()
      .single();

    setLoading(false);
    if (!/^[0-9]{10}$/.test(phone)) {
        showMessage("Phone must be 10 digits ","error");
        return;
      }
    if (error) {
      
      showMessage(error.message ||"Order failed "," error");

      return;
    }
    showMessage("Order placed successfully!","successfuly");

    setCart([]);
    navi("/bill", { state: { order: data } });
  };

  return (
    <>
    <Navbar/>
    <div className="checkout">
      

      <h1>Delivery</h1>

      <form onSubmit={placeOrder}>

        <div className="checkout-box">

          {/* Delivery */}
          <div className="delivery">
            <h2>📍 Delivery Details</h2>

            <label>Name</label>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              
              onChange={(e) => setName(e.target.value)}
            />

            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label>Address</label>
            <textarea
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <h2>💳 Payment Method</h2>

            <label className="pay">
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />
              Cash on Delivery
            </label>

            <label className="pay">
              <input
                type="radio"
                value="TEST"
                checked={paymentMethod === "TEST"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />
              Test Payment
            </label>
          </div>

          {/* Order */}
          <div className="summary">

            <h2>🛒 Order Summary</h2>

            {cart.map((item) => (
              <div className="item" key={item.id}>
                <span>
                  {item.name} × {item.quantity}
                </span>

                <b>
                  ₹{Number(item.price * item.quantity).toFixed(2)}
                </b>
              </div>
            ))}

            <hr />

            <div className="total">
              <span>Total</span>
              <b>₹{Number(totalP).toFixed(2)}</b>
            </div>

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : `Place Order • ₹${Number(totalP).toFixed(2)}`}
            </button>

          </div>

        </div>

      </form>

    </div>
    </>
  );
}

export default Checkout;