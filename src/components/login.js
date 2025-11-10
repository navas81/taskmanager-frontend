import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // <- important for redirect

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // hook for redirection

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://127.0.0.1:5000/api/auth/login", {
      email: email.trim(),
      password: password.trim(),
    });

    
    console.log("Token:", response.data.token);

  } catch (error) {
    console.log(error.response?.data || error.message);
    alert(error.response?.data?.message || "Login failed ❌");
  }
};


  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
