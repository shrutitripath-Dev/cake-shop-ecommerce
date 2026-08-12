import { useNavigate } from "react-router-dom";
import { useAuth } from "./Info.jsx";
import Navbar from "./nav.jsx";
import { useEffect } from "react";

export default function Profile() {
    const { user, logout ,loading} = useAuth();
 
    const navigate = useNavigate();

    // 🔥 Redirect if not logged in

    useEffect(() => {
    if (!loading && !user) {
        navigate("/mylogin");
    }
}, [user, loading]);
    

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    // 🔥 Loading state
    if (loading) {
    return <h2 style={{ color: "white" }}>Loading...</h2>;
}

    return (
        <div className="profile-container">
            <Navbar />

            <h2 className="profile-heading">My Account</h2>

            {/* 🔥 Avatar Button */}
            <div className="simbol">
                <button className='accBut'>
                    {user?.user_metadata?.name
                        ? user.user_metadata.name.charAt(0).toUpperCase()
                        : user?.email?.charAt(0).toUpperCase()}
                </button>
            </div>

            {/* 🔥 Profile Card */}
            <div className="profile-card">
                <p>
                    <strong>Name:</strong>{" "}
                    {user?.user_metadata?.name || "Not set"}
                </p>

                <p>
                    <strong>Email:</strong>{" "}
                    {user?.email || "No email"}
                </p>

                <p>
                    <strong>Phone:</strong>{" "}
                    {user?.user_metadata?.number || "Not set"}
                </p>

                <p>
                    <strong>Country:</strong>{" "}
                    {user?.user_metadata?.country || "Not set"}
                </p>

                <div className="btn-group">
                    <button className="edit-btn">
                        Edit
                    </button>

                    <button 
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}