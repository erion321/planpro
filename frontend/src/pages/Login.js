import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, removeError } from "../features/auth/authSlice";
import { toast } from "react-toastify";

export default function Login() {
  const [user, setUser] = useState({
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
  }, [dispatch, token, error]);

  const submitUser = async (e) => {
    e.preventDefault();
    const data = dispatch(loginUser(user));
  };

  return (
    <div className="h-screen flex flex-col items-center pt-20 gap-8 text-lg">
      <h3 className="text-red-500">Login user</h3>
      <form className="flex flex-col gap-4">
        <input
          type="email"
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
        If you don't have an account <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
