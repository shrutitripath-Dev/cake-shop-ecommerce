import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useMessage} from "./mess.jsx";

function Forget() {
    const { showMessage } = useMessage();

    const nav = useNavigate();
    const [email, setEmail] = useState("");

    const handfor = async () => {
        try {
            const res = await fetch('http://localhost:5000/forgot', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (data.success) {
                showMessage("Password reset link sent! Check your email ", "succeful");
                nav("/mylogin");
            } else {
                showMessage("Failed: " + data.message);
            }
        } catch (err) {
            showMessage("Something went wrong: " + err.message);
        }
    }

    return (
        <div className="loginPage">
            <div className="loginCard">
                <button className="cancel" onClick={() => nav('/')}>✕</button>

                <h2 className="loginTitle">Forgot Password</h2>

                <div className="inputGroup">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button className="loginSubmit" onClick={handfor}>
                    Send Reset Link
                </button>

                <p className="registerText">
                    Remembered? <a href="/mylogin">Back to Login</a>
                </p>
            </div>
        </div>
    );
};
export default Forget;