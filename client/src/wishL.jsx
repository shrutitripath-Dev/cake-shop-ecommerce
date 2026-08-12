import "./App.css"
import Navbar from "./nav.jsx";
import { useNavigate } from "react-router-dom";

function WishList({ wishlist, removeFromWish, addtoC }) {
    const navigate = useNavigate();
    const moveToCart = (item) => {
        addtoC(item);
        removeFromWish(item.id);
    };


return (
    <>
      <Navbar />
      <div className="box">
        <button className="cancel" onClick={() => navigate('/')}>X</button>
        <p>Item in Wish List: {wishlist.length}</p><br />
        <h2>Your Wish List</h2>
        {wishlist.length === 0 ? (
          <p>Wishlist is empty</p>
        ) : (
          <>
            {wishlist.map((item) => (
              <div key={item.id} className="remDiv">
                <img src={item.image} alt="proImg" />
                <div className="itemInfo">
                  <span>{item.name} - ₹{item.price}</span>
                  <button className='addB' onClick={() => moveToCart(item)}>
                    Add to Cart
                  </button>
                  <button className="removeBtn" onClick={() => removeFromWish(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  )
}
export default WishList;
