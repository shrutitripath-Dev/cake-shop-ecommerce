import ws from "ws";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    realtime: {
      transport: ws,
    },
  },
);

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

//Register
app.post("/register", async (req, res) => {
  const { email, password, name, number, contry } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, number, contry }
    }
  });

  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  res.status(201).json({ success: true, message: "Registered successfully", data });
});

//Login 
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return res.status(401).json({ success: false, message: error.message });
  }

  res.status(200).json({ success: true, message: "Login successful", data });
});

app.post("/forgot", async (req, res) => {
  const { email } = req.body;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/reset",
  });

  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  res.status(200).json({ success: true, message: "Password reset email sent" });
});


app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
