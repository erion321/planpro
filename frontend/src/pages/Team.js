import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthState } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  createTeam,
  getTeams,
  resetTeamState,
  selectTeam,
} from "../features/teams/teamSlice";
import Board from "../components/Board";
import Column from "../components/Column";
import { resetBoardState } from "../features/boards/boardSlice";
import { resetColumnState } from "../features/columns/columnSlice";
import { resetTaskState } from "../features/tasks/taskSlice";

export default function Team() {
  const [team, setTeam] = useState("");
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { teams, selectedTeam } = useSelector((state) => state.teams);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teamData = { team, token: localStorage.getItem("token") };
    dispatch(createTeam(teamData));
  };

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    dispatch(getTeams(token));
    dispatch(selectTeam());
  }, []);

  const logoutUser = () => {
    dispatch(resetAuthState());
    dispatch(resetTeamState());
    dispatch(resetBoardState());
    dispatch(resetColumnState());
    dispatch(resetTaskState());
  };

  return (
    <div className="h-screen w-screen flex flex-col items-start gap-4 p-4">
      <nav className="w-full flex justify-around">
        <h1>Plan Pro</h1>
        <button onClick={logoutUser}>Logout</button>
      </nav>
      <div className="flex flex-col gap-4">
        <div>
          <form className="flex items-center gap-6">
            <input
              className="px-1 py-2"
              type="text"
              placeholder="Enter team name"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
            />
            <button onClick={handleSubmit}>Create team</button>
          </form>
          <div>
            {teams.map((team, index) => {
              const { id } = team;
              return (
                <h1 key={index} onClick={() => dispatch(selectTeam(id))}>
                  {team.name}
                </h1>
              );
            })}
          </div>
        </div>
        <div className="flex gap-4">
          {selectedTeam && (
            <div className="flex flex-col gap-4">
              <h1>{selectedTeam.name}</h1>
              <Board />
            </div>
          )}
          {selectedTeam && <Column />}
        </div>
      </div>
    </div>
  );
}
