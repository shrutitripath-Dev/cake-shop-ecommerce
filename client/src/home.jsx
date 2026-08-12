import "./App.css";
import { useState, useEffect } from "react";
import { supabase } from "./Info";
function HomeP({ addtoC, wishlist, toggleWish }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const feachPro = async () => {
            const { data, error } = await supabase.from('products').select('*');
            if (error) {
                console.log(error);
                return
            }
            setProducts(data);
        }
        feachPro();
    }, []);

  

    return (

        <div className="mainLayout">
            <h1 className='d1'>🍰 My Cake Shop</h1>
            <div className='d2'>
                {products.map((product) => {
                    const isWished = wishlist.some(
                        (item) => item.id === product.id
                    );

                    return (
                        <div className='mapPro' key={product.id} style={{ position: "relative" }}>

                            <img className="im" src={product.image} alt={product.name} />

                            <h3 className="na">{product.name}</h3>
                            <button
                                type="button"
                                className={`wishlist-btn ${isWished ? "active" : ""}`}
                                onClick={() => toggleWish(product)}
                            >
                                {isWished ? "♥" : "♡"}
                            </button>

                            <p><b>₹{product.price}</b></p>

                            <button className='addB' onClick={() => addtoC(product)}>Add to Cart</button>
                        </div>
                    );
                })
                }
            </div>
        </div>
    );
}
export default HomeP;