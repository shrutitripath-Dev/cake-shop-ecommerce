import { useState, useEffect } from "react";
import { supabase, useAuth } from "./Info.jsx";
import "./App.css";
import Navbar from "./nav.jsx";
import { useNavigate } from "react-router-dom";
import { useMessage } from "./mess.jsx";



function History() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  const handDel = async (OID) => {

    const { error } = await supabase.from('orders_user')
      .delete()
      .eq('id', OID)
      .eq('user_email', user.email);
    if (error) {
      showMessage("Failed to delete order: " + error.message, " error");
    } else {
      setOrders((preOrders) => preOrders.filter((order) => order.id !== OID));
      showMessage("Order deleted successfully!");
    }
  }

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders_user")
        .select("*")
        .eq("user_email", user.email)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Feach orders error:"+error.message, " error");
      } else {
        setOrders(data);
      }
      setloading(false);
    };

    fetchOrders();

  }, [user]);



  return (
    <>
      <Navbar />
      <div className="orderHistoryPage">
        <h1> My Order</h1>
        {loading ? (
          <p>Loading..</p>
        ) : orders.length === 0 ? (
          <p>No Orders Yet</p>
        ) : (
          orders.map((order) => (
            <div className="historyOrder" key={order.id}>

              <p>Order placed:
                {new Date(order.created_at).toLocaleDateString()}
              </p>

              <button
                className='delHis'
                onClick={() => handDel(order.id)}>
                X
              </button>

              <p>Status:
                {order.order_status}
              </p>

              {order.item.map((item) => (
                <div className="orderCard" key={item.id}>
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <b>
                    ₹{Number(item.price * item.quantity).toFixed(2)}
                  </b>
                </div>
              ))}
              <hr />
              <div className="orderCardTotal">
                <span>Total</span>
                <b>₹{Number(order.total_amount).toFixed(2)}</b>
              </div>

            </div>
          ))
        )}
      </div>
    </>
  );
}
export default History;