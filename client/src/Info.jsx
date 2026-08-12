import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);
const AuthContext = createContext();

export function UserInfo({ children }) {
    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setuser(data.session?.user ?? null);
            setloading(false);
        });

        // Listen for login/logout changes
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setuser(session?.user ?? null);
            setloading(false);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    if (loading) {
        return <h2 style={{ color: "white" }}>Loading...</h2>;
    }

    const logout = async () => {
        await supabase.auth.signOut();
        setuser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setuser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export { supabase };