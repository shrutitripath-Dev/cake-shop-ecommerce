import { useState, useEffect } from "react";
import "./App.css";
import { supabase, useAuth } from "./Info";

function Adm() {
    const { user } = useAuth();

    const [isAdmin, setIsAdmin] = useState(false);
    const [checking, setChecking] = useState(true);

    const [toOr, setToOr] = useState(0);
    const [toUser, setToUser] = useState(0);

    const [deliveredOrders, setDeliveredOrders] = useState(0);

    // =========================
    // CHECK ADMIN
    // =========================
    useEffect(() => {
        const checkAdmin = async () => {
            if (!user?.email) {
                setChecking(false);
                return;
            }

            const email = user.email.trim().toLowerCase();

            console.log("AUTH EMAIL:", JSON.stringify(email));
            console.log("AUTH EMAIL LENGTH:", email.length);

            const { data, error } = await supabase
                .from("admin")
                .select("email_admin")
                .eq("email_admin", email);

            console.log("ADMIN RESULT:", data);
            console.log("ADMIN ERROR:", error);

            if (error) {
                console.log("ADMIN ERROR:", error);
                setIsAdmin(false);
                setChecking(false);
                return;
            }

            if (data && data.length > 0) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }

            setChecking(false);
        };

        checkAdmin();
    }, [user]);

    // =========================
    // DASHBOARD DATA
    // =========================
    useEffect(() => {
        if (!isAdmin) return;

        const getDashboardData = async () => {

            // =========================
            // TOTAL ORDERS
            // =========================
            const {
                count: orderCount,
                error: orderError
            } = await supabase
                .from("orders")
                .select("*", {
                    count: "exact",
                    head: true
                });

            if (orderError) {
                console.log("ORDER ERROR:", orderError);
            } else {
                setToOr(orderCount || 0);
            }


            // =========================
            // ORDER HISTORY
            // =========================
            const {
                data: historyData,
                error: historyError
            } = await supabase
                .from("orders_user")
                .select("*");

            console.log("ORDER HISTORY:", historyData);
            console.log("ORDER HISTORY ERROR:", historyError);

            if (historyError) {
                console.log("HISTORY ERROR:", historyError);
                setDeliveredOrders(0);
            } else {
                setDeliveredOrders(historyData?.length || 0);
            }


            // =========================
            // TOTAL AUTH USERS
            // =========================
            const {
                data: userCount,
                error: userError
            } = await supabase.rpc("get_auth_user_count");

            console.log("AUTH USER COUNT:", userCount);
            console.log("AUTH USER COUNT ERROR:", userError);

            if (userError) {
                console.log("USER ERROR:", userError);
                setToUser(0);
            } else {
                setToUser(userCount || 0);
            }
        };

        getDashboardData();

    }, [isAdmin]);


    // =========================
    // CHECKING
    // =========================
    if (checking) {
        return <h1>Checking...</h1>;
    }


    // =========================
    // ACCESS DENIED
    // =========================
    if (!isAdmin) {
        return (
            <div className="access-denied">
                <h1>Access Denied</h1>
            </div>
        );
    }


    // =========================
    // ADMIN DASHBOARD
    // =========================
    return (
        <div className="admin-dashboard">

            <h1>Welcome Admin 👑</h1>

            <div className="admin-cards">

                {/* ORDERS */}
                <div className="admin-card">
                    <h2>📦</h2>

                    <h3>Total Orders</h3>

                    <p>{toOr}</p>
                </div>


                {/* USERS */}
                <div className="admin-card">
                    <h2>👥</h2>

                    <h3>Total Users</h3>

                    <p>{toUser}</p>
                </div>

                <div className="admin-card">
                    <h2>🚚</h2>
                    <h3>Delivered Orders</h3>
                    <p>{deliveredOrders}</p>
                </div>
                {/* PRODUCTS */}
                <div className="admin-card">
                    <h2>🛒</h2>

                    <h3>Products</h3>

                    <p>
                        Coming Soon
                    </p>
                </div>

            </div>

        </div>
    );
}

export default Adm;