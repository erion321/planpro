import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, removeError } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { token, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      return navigate("/");
    }
    if (error) {
      toast(error);
    }

    dispatch(removeError());
  }, [dispatch, token, toast]);

  const submitUser = async (e) => {
    e.preventDefault();
   dispatch(registerUser(user));
  };

  return (
    <div className="h-screen flex flex-col items-center pt-20 gap-8 text-lg">
      <h3 className="text-red-500">Register user</h3>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => {
            setUser({ ...user, name: e.target.value });
          }}
        />
        <input
          type="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <button onClick={submitUser}>Submit</button>
      </form>

      <p>
        If you already have an account <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

/* const res = await fetch("http://localhost:5000/api/plan_pro/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
 */
