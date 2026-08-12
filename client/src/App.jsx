import "./App.css";
import { useState, useEffect, useRef } from "react";
import Car from "./cartFile.jsx";
import HomeP from "./home.jsx";
import { Routes, Route } from "react-router-dom";
import Navbar from "./nav.jsx";
import About from "./about.jsx";
import Lo from "./login.jsx";
import Re from "./reg.jsx";
import Forget from "./forPass.jsx";
import Reset from "./resetPass.jsx";
import Profile from "./userfile.jsx";
import { supabase, useAuth } from "./Info.jsx";
import Checkout from "./checkout.jsx";
import History from "./ordHis.jsx";
import WishList from "./wishL.jsx";
import { useMessage } from "./mess.jsx";
import Bill from "./bills.jsx";
import Adm from "./admins.jsx";

function App() {
  const { showMessage } = useMessage();
  const { user, loading } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const loadedUser = useRef(null);

  // LOAD CART
  useEffect(() => {
    const loadCart = async () => {
      if (!user) {
        setCart([]);
        setCartLoaded(false);
        loadedUser.current = null;
        return;
      }

      setCartLoaded(false);
      loadedUser.current = null;

      const { data, error } = await supabase
        .from("cart")
        .select("items")
        .eq("user_email", user.email)
        .maybeSingle();

      if (error) {
        console.error("Load cart error:", error);
        setCart([]);
      } else if (data) {
        setCart(data.items || []);
        // console.log("Cart loaded:", data.items);
      } else {
        setCart([]);
        // console.log("No cart found for:", user.email);
      }
      loadedUser.current = user.email;
      setCartLoaded(true);
    };

    if (!loading) {
      loadCart();
    }
  }, [user, loading]);

  // SAVE CART
  useEffect(() => {
    const saveCart = async () => {
      if (!user) return;
      if (!cartLoaded) return;
      if (loadedUser.current !== user.email) return;

      const { data, error } = await supabase
        .from("cart")
        .upsert(
          {
            user_email: user.email,
            items: cart,
            update_at: new Date().toISOString(),
          },
          { onConflict: "user_email", }
        )
        .select();

      if (error) {
        console.error("Save cart error:", error);
      } else {
        showMessage("Cart save",+data,' successful');
      }
    };
    saveCart();
  }, [cart, cartLoaded, user]);

  const addtoC = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, }
            : item);
      }
      return [...prevCart, { ...product, quantity: 1, },];
    });
  };

  const incQu = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1, }
          : item
      )
    );
  };

  const decQu = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => item.id === id
          ? { ...item, quantity: item.quantity - 1, }
          : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeIt = (removeItemCart) => {
    setCart((prevCart) =>
      prevCart.filter(
        (_, index) => index !== removeItemCart
      )
    );
  };

  const totalP = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  const [showCart, setShowCart] = useState(false);


  //------------wish list-----------
  const [wishlist, setWishlist] = useState([]);
  const [wishLoaded, setWishLoaded] = useState(false);
  const loadedWishUser = useRef(null);

  useEffect(() => {
    const loadWish = async () => {
      if (!user) {
        setWishlist([]);
        setWishLoaded(false);
        loadedWishUser.current = null;
        return;
      }
      setWishLoaded(false);
      loadedWishUser.current = null;
      const { data, error } = await supabase
        .from("wish")
        .select("items")
        .eq("user_email", user.email)
        .maybeSingle();
      if (error) {
        console.error("Load wishlist error:"+error.message,"error" );
        setWishlist([]);
      } else {
        setWishlist(data?.items || []);
      }
      loadedWishUser.current = user.email;
      setWishLoaded(true);
    };
    if (!loading) loadWish();
  }, [user, loading]);

  useEffect(() => {
    const saveWish = async () => {
      if (!user || !wishLoaded) return;
      if (loadedWishUser.current !== user.email) return;

      const { error } = await supabase
        .from("wish")
        .upsert(
          { user_email: user.email, items: wishlist, updated_at: new Date().toISOString() },
          { onConflict: "user_email" }
        );
      if (error) console.error("Save wishlist error:"+error.message," error");
    };
    saveWish();
  }, [wishlist, wishLoaded, user]);


  const toggleWish = (product) => {
    setWishlist((prev) => {
      const exists = prev.find(
        (item) => item.id === product.id
      );

      if (exists) {
        return prev.filter(
          (item) => item.id !== product.id
        );
      }

      return [...prev, product];
    });
  };


  const removeFromWish = (id) => {
    setWishlist((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };
  // ROUTES
  return (
    <>
      <Routes>

        <Route
          path="/"
          element={
            <>
              <Navbar
                cart={cart}
                setShowCart={setShowCart}
              />

              <HomeP
                addtoC={addtoC}
                wishlist={wishlist}
                toggleWish={toggleWish} />
            </>
          }
        />

        <Route
          path="/mycart"
          element={
            <Car
              cart={cart}
              incQu={incQu}
              decQu={decQu}
              removeIt={removeIt}
              totalP={totalP}
            />
          }
        />

        <Route
          path="/mylogin"
          element={<Lo />}
        />

        <Route
          path="/register"
          element={<Re />}
        />

        <Route
          path="/forgot"
          element={<Forget />}
        />

        <Route
          path="/reset"
          element={<Reset />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/me"
          element={<Profile />}
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              totalP={totalP}
              setCart={setCart}
            />
          }
        />
        <Route
          path="/orders"
          element={<History />}
        />
        <Route
          path="/wish"
          element={<WishList
            wishlist={wishlist}
            removeFromWish={removeFromWish}
            addtoC={addtoC} />}
        />
        <Route
          path="/bill"
          element={<Bill />} />

          <Route
          path="/admin"
          element={<Adm />} />

      </Routes>
    </>
  );
}

export default App;
