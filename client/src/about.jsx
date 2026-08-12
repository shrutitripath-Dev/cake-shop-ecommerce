import Navbar from "./nav.jsx";
import "./about.css";

function About(){
    return (
        <div className="bodyAb">
        <Navbar/>
        <section className="hero">
        <h2>About Our Bakery</h2>
        <p>Making every celebration sweeter with delicious handmade cakes.</p>
     </section>
     <section className="about">
        <div className="content">
            <h2>Who We Are</h2>
            <p>
                Welcome to <strong>Sweet Cake Shop</strong>, where every cake is baked
                with love and the finest ingredients. Since our beginning, we have
                been creating delicious cakes for birthdays, weddings, anniversaries,
                and every special occasion.
            </p>

            <h2>Our Mission</h2>
            <p>
                Our mission is to bring happiness through freshly baked cakes,
                beautiful designs, and unforgettable flavors. Customer satisfaction
                is our top priority.
            </p>

            <h2>Why Choose Us?</h2>
            <ul>
                <li>🎂 Freshly baked every day</li>
                <li>🍓 Premium quality ingredients</li>
                <li>🎉 Custom cakes for all occasions</li>
                <li>🚚 Fast and reliable delivery</li>
                <li>😊 Friendly customer service</li>
            </ul>

        </div>
    </section>
    <footer>
        <p>2026 Sweet Cake Shop | Made with ❤️</p>
    </footer>


        </div>
    )
}
export default About;
