import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // 🔹 Create new user
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      // 🔹 Store token (auto-login after signup)
      localStorage.setItem("token", res.data.token);

      alert("🎉 Account created successfully!");
      navigate("/tasks"); // Redirect to tasks page
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "❌ Signup failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md text-white border border-white/30">
        <h1 className="text-3xl font-bold mb-6 text-center">📝 Sign Up</h1>

        <form onSubmit={handleSignup} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 rounded-lg text-gray-800"
            required
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-lg text-gray-800"
            required
          />
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-lg text-gray-800"
            required
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-white/80">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-300 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
