import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Team from "./pages/Team";
import Chats from "./pages/Chats";
import Notifications from "./pages/Notifications";
import { useDispatch } from "react-redux";
import { resetAuthState } from "./features/auth/authSlice";
import { resetBoardState } from "./features/boards/boardSlice";
import { resetColumnState } from "./features/columns/columnSlice";
import { resetTaskState } from "./features/tasks/taskSlice";
import { resetTeamState } from "./features/teams/teamSlice";

export default function App() {
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(resetAuthState());
    dispatch(resetTeamState());
    dispatch(resetBoardState());
    dispatch(resetColumnState());
    dispatch(resetTaskState());
  };

  return (
    <div>
      <nav className="w-full flex justify-between px-8 py-4  gap-8">
        <div className="flex items-baseline gap-4">
          <h1 className="font-medium text-lg">Plan Pro</h1>
          <Link to="/">Team</Link>
          <Link to="/chats">Chats</Link>
          <Link to="/notifications">Notifications</Link>
        </div>
        <button className="font-medium" onClick={logoutUser}>
          Logout
        </button>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Team />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}
