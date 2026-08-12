import "./App.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./Info.jsx";
import { Eye, EyeOff } from "lucide-react";
import {useMessage} from "./mess.jsx";



function Reset() {
    const { showMessage } = useMessage();

    const nav = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [ready, setReady] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === "PASSWORD_RECOVERY") {
                setReady(true);
            }
        });

        supabase.auth.getSession().then(({ data }) => {
            if (data.session) setReady(true);
        });
    }, []);

    const handleReset = async () => {
        if (!password || password.length < 6) {
            showMessage("Password must be at least 6 characters", "error");
            return;
        }
        if (password !== confirmPassword) {
            showMessage("Password do not match", "error");
            return;
        }

        const { error } = await supabase.auth.updateUser({ password });
        if (error) {
            showMessage("Failed:"+ error.message, " error");

        } else {
            showMessage("Password updated successfully! Please login.","successful");
            nav("/mylogin");
        }
    };

    return (
        <div className="loginPage">
            <div className="loginCard">
                <button className="cancel" onClick={() => nav('/')}>✕</button>

                <h2 className="loginTitle">Reset Password</h2>
                {!ready && (
                    <p style={{ fontSize: "0.85rem", marginBottom: "16px" }}>
                        Verifying reset link...
                    </p>
                )}

                

                <div className="inputGroup">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
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

                <div className="inputGroup">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span
                        className="eyeIcon"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                </div>

                <button className="loginSubmit" onClick={handleReset}>
                    Update Password
                </button>

                <p className="registerText">
                    <a href="/mylogin">Back to Login</a>
                </p>
            </div>
        </div>
    );
}

export default Reset;