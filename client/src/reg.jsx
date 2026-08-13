import './App.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useMessage } from "./mess.jsx";


function Re() {
  const { showMessage } = useMessage();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contry, setContry] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          name,
          contry,
          number
        })
      });



      const data = await res.text();
      // console.log(data);

      if (!email.endsWith("@gmail.com")) {
        showMessage("Only Gmail allowed ", "error");
        return;
      }

      if (!/^[0-9]{10}$/.test(number)) {
        showMessage("Phone must be 10 digits ", "error");
        return;
      }

      if (res.ok) {
        showMessage("Registered successfully ✅", "successful");
        navigate('/login');
      } else {
        showMessage(data.message || "Registration failed: ", "error");
      }

    } catch (err) {
      console.error("Error:", err);
      showMessage("Something went wrong. Please try again.", "error");
    }


  };

  return (
    <div className="RegisPage">
      <div className="ReCard">
        <button className="cancel" onClick={() => navigate('/')}>✕</button>

        <h2 className="RegTitle">Register</h2>

        <div className="inputGroup">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputGroup">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="inputGroup">
          <input
            type="text"
            placeholder="Country"
            value={contry}
            onChange={(e) => setContry(e.target.value)}
          />
        </div>

        <div className="inputGroup">
          <input
            type="text"
            placeholder="Phone No:"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />

        </div>

        <div className="inputGroup">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="eyeIcon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
        <br />



        <button className="regSubmit" onClick={handleRegister}>
          CREAT ACCOUNT
        </button>

        <p className="SinText">
          Already have an account? <a href="/mylogin">Sign Up </a>
        </p>
      </div>
    </div>
  );
}
export default Re;
