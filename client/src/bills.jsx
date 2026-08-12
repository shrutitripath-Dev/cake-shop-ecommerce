import "./App.css";
import Navbar from "./nav.jsx"
import { useLocation, useNavigate } from "react-router-dom";

function Bill() {
    const location = useLocation();
    const navi = useNavigate();
    const order = location.state?.order;
    if (!order) {
        return (
            <>
                <Navbar />
                <div className="orderB">
                    <p>No Order found.</p>
                    <button onClick={() => navigate('/')}>Go Home</button>
                </div>
            </>
        )
    }
    return (
        <>
            <Navbar />
            <div className="OC">
                <h2>🧾 Order Receipt</h2>
                <p>Order ID:{order.id}</p>
                <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                <p>Status: {order.order_status}</p>
                <hr />
                {order.item.map((item) => (
                    <div className="BillItem" key={item.id}>
                        <span>{item.name} X {item.quantity}</span>
                        <b>Rs.{Number(item.price * item.quantity).toFixed(2)}</b>
                    </div>
                ))}
                <hr />
                <div className='BillTotal'>
                    <span>Toatl</span>
                    <b>₹{Number(order.total_amount).toFixed(2)}</b>
                </div>
                <p>Delivering to: {order.address}</p>
                <p>Payment: {order.payment_method}</p>
                <button onClick={() => navi("/")}>Continue Shopping</button>
            </div>
        </>
    );
}

export default Bill;