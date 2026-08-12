import './App.css'
import Navbar from "./nav.jsx";
import { supabase } from './Info.jsx';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import {useMessage} from "./mess.jsx";


function Lo() {
  const { showMessage } = useMessage();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //Backend fun
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      showMessage("Login Faild: "+error.message," error");
            return;
    }
    showMessage("Login successfully","successful");
    navigate("/"); 

  };


  return (<>
    <Navbar />
    <div className="loginPage">
      <div className="loginCard">
        <button className="cancel" onClick={() => navigate('/')}>✕</button>

        <h2 className="loginTitle">Login</h2>

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
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>


        <div className="loginOptions">
          <span
            className="eyeIcon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
          <a href="/forgot">Forgot Password?</a>
        </div>

        <button className="loginSubmit"
          disabled={!email || !password}
          onClick={handleLogin}>Login
        </button>

        <p className="registerText">
          Don't have an account? <a href="/register">Register</a>
        </p>

      </div>
    </div>
  </>
  );
}
export default Lo;